---
slug: disable-ssh-password-login
title: Secure SSH by Disabling Password Login
authors: [nvh95]
tags: [linux, ssh, security, homelab]
---

If your SSH port is exposed to the internet and your account password is compromised, an attacker could use it to log in to your server. One way to reduce this risk is to disable password login and require an authorized SSH key instead. Only clients with access to the matching private key can authenticate, so a stolen account password alone is not enough.

Here is how to configure it, check the settings, and test a new connection without locking yourself out.

The server commands below are for Debian. On other systems, the configuration paths, service names, or service-management commands may differ.

<!-- truncate -->

## 1. Create an SSH key if you do not already have one

On your client computer, check for an existing public key:

```bash
ls ~/.ssh/*.pub
```

If you already have a key pair you want to use, skip generation. Otherwise, create an Ed25519 key:

```bash
ssh-keygen -t ed25519 -C "alex@example.com"
```

Replace the comment with your email address or another label. Accept the default file location if it is unused, and choose a passphrase. If prompted to overwrite an existing key, stop and choose a different filename instead.

The default files are `~/.ssh/id_ed25519` (your private key) and `~/.ssh/id_ed25519.pub` (your public key). Keep the private key on your client; only copy the public key to the server.

## 2. Install the public key and test login

While password login is still enabled, install your public key:

```bash
ssh-copy-id -i ~/.ssh/id_ed25519.pub alex@192.168.0.13
```

Replace `alex` and `192.168.0.13` with your username and server address. If you chose a different key filename, adjust the path too.

If your client does not have `ssh-copy-id`, you can use `ssh` to append the public key instead:

```bash
cat ~/.ssh/id_ed25519.pub | ssh alex@192.168.0.13 'umask 077; mkdir -p ~/.ssh; cat >> ~/.ssh/authorized_keys; chmod 700 ~/.ssh; chmod 600 ~/.ssh/authorized_keys'
```

Now open a new Terminal window and connect:

```bash
ssh alex@192.168.0.13
```

Make sure this succeeds without asking for your **server account password**. If your client uses SSH connection sharing, disable it for this test with `-o ControlMaster=no -o ControlPath=none` so it opens a fresh connection. If your key is not in a default location, add `-i /path/to/private_key`. On an iPhone, use an SSH client configured with your private key.

A prompt for your **private key passphrase** is normal. That unlocks the key on your client; it is different from entering your server account password.

If this connection fails, stop here and fix key authentication first. Also confirm that your account can run `sudo`.

Keep this working SSH session open throughout the remaining steps. Have access to the laptop's local keyboard and screen in case you need to recover.

## 3. Create a dedicated SSH configuration file

On the server, check that `/etc/ssh/sshd_config` includes `/etc/ssh/sshd_config.d/*.conf` outside any `Match` block. If it does, create a dedicated file:

```bash
sudo nano /etc/ssh/sshd_config.d/99-key-only.conf
```

Add:

```text
PubkeyAuthentication yes
PasswordAuthentication no
KbdInteractiveAuthentication no
AuthenticationMethods publickey
PermitRootLogin no
```

| Setting | Purpose |
| --- | --- |
| `PubkeyAuthentication yes` | Enable public key authentication. |
| `PasswordAuthentication no` | Disable SSH password authentication. |
| `KbdInteractiveAuthentication no` | Disable keyboard-interactive authentication, which can otherwise prompt for a password through PAM. |
| `AuthenticationMethods publickey` | Require public key authentication for SSH login. |
| `PermitRootLogin no` | Disable direct SSH login as root, including with a key. Use your regular account and `sudo` instead. |

If your server does not include this directory, put the settings in the global section of `/etc/ssh/sshd_config`, before any `Match` blocks, and update existing entries rather than adding conflicting duplicates.

These settings are documented in the [OpenSSH server configuration manual](https://man.openbsd.org/sshd_config).

## 4. Validate the configuration before applying it

Check the syntax:

```bash
sudo /usr/sbin/sshd -t
```

No output and a successful exit status mean the check passed. If it reports an error, fix it before continuing.

Next, inspect the effective settings:

```bash
sudo /usr/sbin/sshd -T | grep -E '^(pubkeyauthentication|passwordauthentication|kbdinteractiveauthentication|authenticationmethods|permitrootlogin) '
```

The expected values are shown below; their order may differ:

```text
pubkeyauthentication yes
passwordauthentication no
kbdinteractiveauthentication no
authenticationmethods publickey
permitrootlogin no
```

### A higher-numbered file does not necessarily override earlier settings

For these settings, OpenSSH generally uses the first value it reads. Included files are read at the location of the `Include` directive, with wildcard matches read in lexical order. A setting read earlier can therefore take precedence over `99-key-only.conf`.

If the values do not match, inspect `/etc/ssh/sshd_config` and the other files in `/etc/ssh/sshd_config.d/`. Resolve conflicting settings and run both checks again before reloading SSH.

If your configuration uses `Match` blocks, also inspect the settings for your actual connection:

```bash
sudo /usr/sbin/sshd -T \
    -C user=alex,addr=192.168.0.20,host=mac.local,laddr=192.168.0.13,lport=22 \
    | grep -E '^(pubkeyauthentication|passwordauthentication|kbdinteractiveauthentication|authenticationmethods|permitrootlogin) '
```

Replace the example values with your SSH username, client IP and hostname, and server IP and port. See the [OpenSSH daemon manual](https://man.openbsd.org/sshd) for the validation options. If `sshd` is installed elsewhere, adjust `/usr/sbin/sshd` in these commands.

## 5. Reload SSH

Keep your existing session open, then run:

```bash
sudo systemctl reload ssh
```

You do not need to reboot the server. Check that the command succeeds before testing another connection.

## 6. Test both authentication paths

From a new Terminal window on your Mac, try connecting with public key authentication disabled:

```bash
ssh -o PubkeyAuthentication=no \
    -o PreferredAuthentications=password,keyboard-interactive \
    -o ControlMaster=no -o ControlPath=none \
    alex@192.168.0.13
```

This connection should fail. A typical error is:

```text
alex@192.168.0.13: Permission denied (publickey).
```

Then open another new connection:

```bash
ssh alex@192.168.0.13
```

It should still succeed. If you use connection sharing, add `-o ControlMaster=no -o ControlPath=none` again. Only close your original session after this fresh key-based login works.

If it fails, use the original session or the laptop's local console to correct the configuration, validate it, and reload SSH again.

## Your local password still works

Disabling SSH password authentication does not remove your server account password. You can still use it for `sudo` and local console login, subject to your existing account and PAM settings.

Keep your private key protected and make sure you have a recovery path if the client holding it is lost.
