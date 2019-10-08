# Notes and instructions concerning XenServer

## Introduction

The installation disk size for XenServer 7 and 8 must be between 46 GB (or 47104 MB) and 50 GB (51200 MB). [Citrix](https://docs.citrix.com/en-us/xenserver/7-1/install/partition-layout.html) requires 46 GB to hold all the partitions and 50 GB corresponds to the maximum volume that Image Streamer can handle. Most of this disk will bot be used because Image Streamer uses **thin storage**. Only about .5 GB will be provisioned. Moreover the partition layout strictly consumes 42.5 GB, leaving at least  4.5 GB free space for a small local Storage Repository (SR) that can be created during the initial installation process and that can be used during upgrades. Note that Plan Scripts in this GitHub repository is no able to cope with Storage Repositories spanning several disks.

By default the XenServer installer does not load iSCSI drivers required to access the OS-Volume presented by the Image Streamer. Hence manual operations must occur before launching the installer and then at first reboot.

## Pre-requisite

* Add and then extract the [LinuxMultiDistro-AB](artifact-bundles/LinuxMultiDistro-AB-v0.2-HPE-UEFI.zip) artifact bundle contained in this GitHub repository. This artifact bundle contains a generic capture Build Plan suitable for XenServer and a XenServer specific deployment Build Plan.

## Initial XenServer installation

* Create a profile using the **HPE - Foundation 1.0 - create empty OS Volume** OS Deployment Plan.

* Mount the XenServer ISO installation media using **iLO Virtual Media** and boot from it.

* In the Grub menu, hit the down arrow to start a **shell** to configure iSCSI and launch the installer with suitable option:

    ```bash
    echo "InitiatorName=<iqn.yyyy-mm.com.hpe:oneview-string" > /etc/iscsi/initiatorname.iscsi

    /opt/xensource/installer/init --use_ibft
    ```

    where `iqn.yyyy-mm.com.hpe:oneview-string` is the iSCSI initiator name found in the in the **first** Network connection of the **Server Profile**. Expand this first connection by clicking on the left small triangle icon to see the details of the connection.

* Answer `Yes` to the `Attach to disks specified in iBFT?` question and `OK` to the `Welcome to XenServer Setup` popup.

* `Accept EULA`

* Select the `[LeftHand iSCSIDisk]` on which XenServer will be installed. Hit `OK`

* In the `Virtual Machine Storage` screen, you can select the `[LeftHand iSCSIDisk]` on which XenServer will be installed for the creation of a local Storage Repository (SR). However **de-select** all the other disks if any. As said previously Plan Scripts in this GitHub repository cannot handle a Storage Repository spanning the installation disk and others.

* Keep the `Local media` for Installation Source

* Verify or skip the media verification process

* Supply a root password

* Select the last `eth` NIC to be configured. Typically `eth2` if you have 3 network connections in the profile (2 iSCSI deployment NICs and one Management NIC). Double check with the MAC address in the profile.

* Go through the network configuration process with DHCP, NTP and DNS configurations. During deployment, specific Plan Scripts will fine tune this network configuration

* When the initial installation finishes, reboot the compute node and bring up XenServer so initialization completes.

* If you intend to use the [UEFI paradigm](docs/ImageStreamer-LegacyAndUefiParadigms.pdf), append the following line to `/etc/rc.d/rc.local` and add to it the execute protection in order to start the compatibility `rc-local` service at boot time.

```bash
echo "/usr/bin/bash /boot/efi/EFI/HPE/isdeploy/HPE-ImageStreamer.bash" >> /etc/rc.d/rc.local
chmod a+x /etc/rc.d/rc.local
```

* Perform other customization at will

* Shutdown the host from the XenServer console

## Golden Image creation

* From the profile used for the initial XenServer installation, in the `OS Deployment` section, identify the OS volume that was created to hold this XenServer. This is the OS volume to use to capture the golden image.

* If the Image Streamer GUI is not already active, click on the OS-Volume to start it.

* From the Image Streamer GUI, select the `Golden images` page and then `Create golden image`

* Fill-up the `Name`, OS volume and optionally supply a description. A best practice is to append the [paradigm](docs/ImageStreamer-LegacyAndUefiParadigms.pdf) (UEFI or Legacy) to the golden Image name.

* Select the appropriate `LinuxCapture-CaptureBP-HPE-[UEFI|Legacy]` Build Plan contained in the corresponding `LinuxMultiDistro-AB*` artifact bundle

* Click on the `Create` icon

* In case of problem, select `Activity` section from the pull down menu next to the Golden Image name and download the capture logs.

## Deployment Plan tips

TBD
