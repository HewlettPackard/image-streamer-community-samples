# Notes and instructions concerning CentOS 7

## Introduction

Follow these instructions to create a CentOS 7 Golden Image.

## Pre-requisite

* CentOS 7 installation media

## Initial CentOS 7 installation

* Create a profile using the **HPE - Foundation 1.0 - create empty OS Volume** OS Deployment Plan.

* Mount the CentOS 7 server .iso kit on the iLO Virtual Media

* Boot on the iLO Virtual Media and hit the up arrow as soon as the grub menu appears

* Type `e` to edit the grub menu

* Append the following text the the kernel line and modify iscsi_firmware?

    ```bash
    linuxefi ....  rd.iscsi.ibft=1
    ```

* Hit `CTRL-X` to exit grub and start the installation process

* In the Target storage menus, if you intend to deploy using the [Legacy deployment process](docs/ImageStreamer-LegacyAndUefiParadigms.pdf), make sure you don't select `btrfs` or `xfs` for the root file system. Select `Manual partitioning`, select the formatting as you like (`LVM` or `standard partitioning`...) and click on `Generate partitions automatically`. This screen allows the modification of the File Systems on the root partitions.

* It is not necessary to go through the Network and hostname configuration.

* Supply root password and wait for installation to complete.

* Reboot and log into the server as root.

* Edit `/etc/default/grub` and modify the `GRUB_CMDLINE_LINUX` variable as the following. The `console=sttyS0,115200` parameter is optional.

```bash
GRUB_CMDLINE_LINUX="crashkernel=auto rd.iscsi.firmware rd.iscsi.ibft=1 console=ttyS0,115200"
```

* Re-compile grub:

```bash
grub2-mkconfig -o /boot/efi/EFI/centos/grub.conf
```

* If you intend to use the [UEFI paradigm](docs/ImageStreamer-LegacyAndUefiParadigms.pdf), append the following line to `/etc/rc.d/rc.local` and add to it the execute protection in order to start the compatibility `rc-local` service at boot time.

```bash
echo "/bin/bash /boot/efi/EFI/HPE/isdeploy/HPE-ImageStreamer.bash" >> /etc/rc.d/rc.local
chmod a+x /etc/rc.d/rc.local
```

* Perform other customization at will

* Shutdown the server

## Golden Image creation

* From the OneView server profile used for the initial CentOS 7 installation, in the `OS Deployment` section, identify the OS volume that was created to hold this CentOS 7. This is the OS volume to use to capture the golden image.

* If the Image Streamer GUI is not already active, click on this OS-Volume to start it.

* In the Image Streamer GUI, select the `Golden images` page and then `Create golden image`

* Fill-up the `Name`, OS volume and optionally supply a description. A good practice is to append a suffix `-UEFI`or `Legacy` to mention which paradigm will be used by this Golden Image

* Select the appropriate `LinuxCapture-CaptureBP-HPE-[UEFI|Legacy]` Build Plan contained in the corresponding `LinuxMultiDistro-AB*` artifact bundle

* Click on the `Create` icon

* In case of problem, select `Activity` section from the pull down menu next to the Golden Image name and download the capture logs.

## Deployment tips

TBD