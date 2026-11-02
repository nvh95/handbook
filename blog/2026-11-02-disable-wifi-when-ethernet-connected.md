---
slug: disable-wifi-when-ethernet-connected
title: Automatically Disable Wi-Fi When Ethernet Is Connected
authors: [nvh95]
tags: [debian, linux, networking, home-assistant, homelab]
---

I am setting up Home Assistant on an old Dell laptop. Because this machine will run all the time, I have been looking for small ways to reduce its power usage.

One simple improvement is to turn off Wi-Fi whenever Ethernet is connected, then turn Wi-Fi back on when the Ethernet cable is unplugged. Debian 13 uses NetworkManager, so this can be automated with a dispatcher script.

<!-- truncate -->

## How it works

[NetworkManager dispatcher scripts](https://networkmanager.dev/docs/api/latest/NetworkManager-dispatcher.html) run in response to network events. Each script receives the affected network interface as its first argument and the event, such as `up` or `down`, as its second argument.

We will listen only for events from the Ethernet interface:

- When Ethernet goes up, turn Wi-Fi off.
- When Ethernet goes down, turn Wi-Fi on.

> This setup reacts to the Ethernet connection state, not internet availability. If the cable remains connected but the wired network loses internet access, it will not automatically switch to Wi-Fi.

For my setup, that limitation is acceptable because Ethernet and Wi-Fi usually connect to the same local network.

## 1. Find the Ethernet interface name

Run:

```bash
nmcli device status
```

Look for the device whose type is `ethernet`. In this example, it is `enp3s0`:

```text
DEVICE   TYPE      STATE      CONNECTION
enp3s0   ethernet  connected  Wired connection 1
wlp2s0   wifi      connected  your-wifi-name
```

Your interface name may be different. Replace `enp3s0` in the script below with the name shown on your machine.

## 2. Enable automatic Wi-Fi connection

Make sure the saved Wi-Fi connection can connect automatically. Replace `your-wifi-name` with the name of your Wi-Fi connection profile:

```bash
sudo nmcli connection modify "your-wifi-name" connection.autoconnect yes
```

To find the correct profile name, run:

```bash
nmcli connection show
```

## 3. Create the NetworkManager dispatcher script

Create the dispatcher directory if it does not already exist:

```bash
sudo mkdir -p /etc/NetworkManager/dispatcher.d
```

Open a new script:

```bash
sudo nano /etc/NetworkManager/dispatcher.d/90-wifi-failover
```

Paste the following content:

```bash
#!/bin/bash

LAN="enp3s0"

[ "$1" = "$LAN" ] || exit 0

case "$2" in
    up)
        logger -t wifi-failover "LAN connected -> Wi-Fi OFF"
        nmcli radio wifi off
        ;;
    down)
        logger -t wifi-failover "LAN disconnected -> Wi-Fi ON"
        nmcli radio wifi on
        ;;
esac
```

Save the file and exit the editor.

## 4. Set the required permissions

NetworkManager dispatcher scripts must be executable and owned by `root`:

```bash
sudo chown root:root /etc/NetworkManager/dispatcher.d/90-wifi-failover
sudo chmod 755 /etc/NetworkManager/dispatcher.d/90-wifi-failover
```

There is no need to restart NetworkManager. The script will run when the next matching network event occurs.

## 5. Synchronize the initial state

If Ethernet is already connected while you are creating the script, its `up` event has already happened. Turn Wi-Fi off once manually:

```bash
sudo nmcli radio wifi off
```

After that, the dispatcher script will handle future Ethernet connection changes.

## 6. Test the setup

While Ethernet is connected, check the device state:

```bash
nmcli device status
```

The result should look similar to this:

```text
DEVICE   TYPE      STATE        CONNECTION
enp3s0   ethernet  connected    Wired connection 1
wlp2s0   wifi      unavailable  --
```

Now unplug the Ethernet cable. Wi-Fi should turn on and automatically reconnect to `your-wifi-name`. Plug the cable back in and Wi-Fi should turn off again.

You can inspect the script's recent log entries with:

```bash
journalctl -t wifi-failover -n 20 --no-pager
```

I also recommend rebooting the laptop once and repeating the test to make sure the behavior is reliable on your system.

## Remote-access warning

If you are connected to the laptop over SSH through Ethernet, unplugging the cable will end the current SSH session. Wait for Wi-Fi to connect, then connect again.

For example, if local hostname resolution is configured, you may be able to reconnect with:

```bash
ssh your-user@homelab.local
```

## Restore the default behavior

To disable the automation without deleting the script, remove its executable permission and turn Wi-Fi back on:

```bash
sudo chmod -x /etc/NetworkManager/dispatcher.d/90-wifi-failover
sudo nmcli radio wifi on
```

You can re-enable it later with:

```bash
sudo chmod 755 /etc/NetworkManager/dispatcher.d/90-wifi-failover
```

## What about changing IP addresses?

Ethernet and Wi-Fi are different network interfaces, so they can receive different IP addresses even when they connect to the same network. Hard-coding an IP address for SSH or Home Assistant can therefore become inconvenient.

There are several ways to solve this. I chose mDNS so I can reach the laptop through a stable name such as `homelab.local`, regardless of which interface is active. I will share how I set that up in another post. Stay tuned!
