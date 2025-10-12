---
slug: install-hp-laserjet-1020-mac
title: How to Install HP LaserJet 1020 on Mac
authors: [nvh95]
tags: [mac]
---

Steps to install HP LaserJet 1020 printer on macOS.

<!-- truncate -->

It takes me a while to figure out how to install HP LaserJet 1020 on macOS Sequoia 15. Following are the steps I found to work. I hope this will save you some time.

## Standard Installation

### 1. Download HP Printer Software

Download HP 5.1.1 Printer Software Update from https://support.apple.com/en-us/106385

### 2. Install the Software

Run the downloaded installer.

### 3. Add Printer

Go to **System Settings** → **Printers & Scanners** → **Add Printer, Scanner, or Fax...**

### 4. Select Driver

Select **Use: Choose a Driver** → **Select Software** → **HP LaserJet 1022, 1.6.1**

(Yes, it's 1022, not 1020)

The printer should work now.

## Troubleshooting for macOS 15.1+

If you encounter `This update requires macOS version 15.0 or earlier.`, follow these steps:

Based on https://discussions.apple.com/thread/255981811?answerId=261291706022&sortBy=rank#261291706022

### Extract the Installation Package

```bash
mkdir hp_driver
xar -xf HewlettPackardPrinterDrivers.pkg -C hp_driver
```

### Extract Payload

```bash
cd hp_driver/HewlettPackardPrinterDrivers.pkg/
cat Payload | gunzip -dc | cpio -i
```

You will see a `Library` folder.

### Copy Files to System

```bash
sudo cp -R ./Library/Printers/hp/laserjet/ /Library/Printers/hp/laserjet/
sudo cp -R "./Library/Printers/PPDs/Contents/Resources/HP LaserJet 1022.gz" "/Library/Printers/PPDs/Contents/Resources/HP LaserJet 1022.gz"
```

Then repeat steps 3 and 4 from the standard installation.

## Fix Driver Signing Issues

If you encounter "The software for the printer was installed incorrectly. Please install the software from the manufacturer", you need to handle driver signing.

### 1. Trigger Security Approval

- Open **System Settings** → **Privacy & Security**
- Scroll to the bottom; if you see "HP LaserJet 1020 driver was blocked" or "Allow" for HP software, click **Allow**
- Reboot or log out/in afterward

### 2. Reset the Printing System

- **System Settings** → **Printers & Scanners**
- Right-click in the printers list → **Reset printing system...**
- Add your printer again, selecting HP LaserJet 1022 driver

### 3. If No "Allow" Prompt Appears

Re-sign the bundle ad-hoc:

```bash
sudo codesign --force --deep --sign - /Library/Printers/hp/laserjet/hplaserjetzjs.bundle
```

Verify the signature:

```bash
codesign --verify --verbose /Library/Printers/hp/laserjet/hplaserjetzjs.bundle
```

You should see `valid on disk` and `satisfies its Designated Requirement`.

Restart the printing system:

```bash
sudo launchctl stop org.cups.cupsd
sudo launchctl start org.cups.cupsd
```

Repeat steps 3 and 4 from the standard installation.
