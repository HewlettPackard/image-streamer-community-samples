# Notes concerning Ubuntu (18.04 and later)

## Profile creation for first time installation

* Create a profile using the **HPE - Foundation 1.0 - create empty OS Volume** OS Deployment Plan.

* As best practice, the minimum is to have two iSCSI connections (primary and secondary) on the Image Streamer network and at least one management network.

## First time installation

* Mount the [Ubuntu traditional installer](http://cdimage.ubuntu.com/releases/19.04/release/ubuntu-19.04-server-amd64.iso) in the **iLO Virtual Media**. Prefer the traditional server installer to the new Live installer.

* Boot from the **iLO Virtual Media** and step through the install for the first items Keyboard, location, locales, keyboard layout, language...

* In the Network Setup select a non-iSCSI NIC for your management interface. If you defined two iSCSI connections in the profile, you should select the third (i.e. `ens3f4`) connection in the list.

* You can postpone the configuration for a later time.

* Set up hostname, users and passwords

* By default the Ubuntu installer is not configured to detect iSCSI disks. Hence it will only propose visible non-iSCSI disks if any. Select **`<Go Back>`** button (lower left corner) to configure iSCSI target detection.

* From the Installer main menu, select **`Execute a shell`** at the **bottom** of the step list. Read and acknowledge the pop-up message.

* From the BusyBox shell configure the `ens3f0` NIC with the **Initiator IP address** found in the **first** network Connection of the Server Profile. Ping the iSCSI target to validate your network connection. The iSCSI target IP address is also present in the first connection of the server profile:

    ```bash
    ~ # ip addr add 192.168.8.108/24 dev ens3f0
    ~ # ip link set ens3f0 up
    ~ # ping 192.168.8.198
    ~ # exit
    ```

* Detect disks again and select `Configure iSCSI volumes`  or `Login to iSCSI targets` depending whether you have local disks or not.

* Supply the initiator iqn (i.e. `iqn.2015-02.com.hpe:oneview-vcg3m2x028`) and iSCSI Target IP address.You can find this info in the details of the first network connection of the OneView server profile.

* No username needed: select **`<Continue>`**

* You should now see the iSCSI target with a `lefthand` string in its iqn name. Hit `space` to select it and then <Continue>.

* Select a `Guided` or the `Manual` partitioning menu depending on your needs. The only important thing is that, for some reason guestfish in Image Streamer v4.10 and 4.20 does not recognize the Ubuntu `ext4` root (`/`) file system (not tested with 5.0 yet), which is the default. Hence, to use the [Legacy paradigm](docs/ImageStreamer-LegacyAndUefiParadigms.pdf), it is mandatory to switch to `ext3`. The UEFI paradigm works with all types of `/` file system. In this example we go through the `Guided - use entire disk and setup LVM` menus to explain how to modify the root file system type from `ext4` to something else. We assume as well that the OS volume has not been partitioned previously.

* Select the `LEFTHAND iSCSIDisk`

* Write the changes to disk and configure LVM ? `<Yes>`

* Adjust (or not) the amount of volume group and `<Continue>`

* Write the changes to disk ? **`<No>`**

* Select the line below the first `LVM` line and change `ext4` to `ext3 journaling file system` if you want to use the Legacy paradigm or something else if you want to use the UEFI paradigm.

* Hit the `Done setting up the file system` line

* `Finish partitioning and write changes to disk`: `<Yes>`

* Choose your favorite update method

* Select needed software (i.e. OpenSSH Server)

* Reboot. Make sure that the **iLO Virtual Media** has been disconnected.

* As soon as the green HPE logo appears, hit the `e` key to edit the grub configuration file. Since  the boot process goes very fast, you may want to stop first at the `One Time boot Options (F11)` to avoid missing this step.

* Append the `iscsi_auto` kernel option to the `linux` line so it looks like:

   ```bash
   linux ... iscsi_auto
    ```

* Hit `Ctrl-x` to save the modification and exit the editor

* Login and add the `iscsi_auto` option to the `GRUB_CMDLINE_LINUX`  variable of the `grub` configuration file:

    ```bash
    sudo vi /etc/default/grub
    ...
    GRUB_CMDLINE_LINUX="iscsi_auto"
    ...
    :wq!

    sudo update-grub

   ```

* If you intend to use the [UEFI paradigm](docs/ImageStreamer-LegacyAndUefiParadigms.pdf), create and insert the following lines to `/etc/rc.local` and add to it the execute protection in order to start the compatibility `rc-local` service during boot time.

```bash
echo '#!/usr/bin/bash' > /etc/rc.local
echo '/usr/bin/bash /boot/efi/EFI/HPE/isdeploy/HPE-ImageStreamer.bash' >> /etc/rc.local
chmod a+x /etc/rc.local
```

* Perform other customization at will

* Shutdown the server

## Golden Image capture

* From the OneView server profile used for the initial Ubuntu  installation, in the `OS Deployment` section, identify the OS volume that was created to hold this Ubuntu OS. This is the OS volume to use to capture the golden image.

* If the Image Streamer GUI is not already active, click on this OS-Volume to start it.

* In the Image Streamer GUI, select the `Golden images` page and then `Create golden image`

* Fill-up the `Name`, OS volume and optionally supply a description. A good practice is to append a suffix `-UEFI`or `Legacy` to mention which paradigm will be used by this Golden Image

* Select the appropriate `LinuxCapture-CaptureBP-HPE-[UEFI|Legacy]` Build Plan contained in the corresponding `LinuxMultiDistro-AB*` artifact bundle

* Click on the `Create` icon

* In case of problem, select `Activity` section from the pull down menu next to the Golden Image name and download the capture logs.

## Deployment Plan tips

TBD