# Artifact description and content

## Description

Artifact Name:LinuxMultiDistro-AB-v0.1-HPE-Legacy

Description:Build Plans and Plan Scripts for capturing and deploying various flavors of Linux oriented OSs including XenServer, CentOS, RHEL, SLES and Ubuntu

Read Only:false

Time Stamp:2019-10-02T14:57:15.380Z

Artifact Type:USER

## Build Plans description

Name | Type | Description | Steps
-|-|-|-
 LinuxCapture-CaptureBP-HPE-Legacy |  capture |  Capture Golden Images. Tested with CentOS 7.6 and XenServer 7.6 |  1- MountAndValidate-GeneralPS-HPE-Legacy 2- GeneralizeHostBeforeCapture-CapturePS-HPE-Legacy 3- GeneralizeNetworkBeforeCapture-CapturePS-HPE-Legacy 4- GeneralizeUsersBeforeCapture-CapturePS-HPE-Legacy 5- CleanupAfterCapture-CapturePS-HPE-Legacy 6- Unmount-GeneralPS-HPE-LegacyUefi
 LinuxDeployment-DeployBP-HPE-Legacy |  deploy |  Deploys pure Linux distros. Not suitable for XenServer Tested with CentOS-1810 and SLE 15 |  1- MountAndValidate-GeneralPS-HPE-Legacy 2- PrepareForDeployment-DeployPS-HPE-Legacy 3- LinuxConfigureMultipleNICs-DeployPS-HPE-Legacy 4- LinuxConfigureHostname-DeployPS-HPE-Legacy 5- LinuxConfigureUsers-DeployPS-HPE-Legacy 6- LinuxManageSecurityServices-DeployPS-HPE-Legacy 7- FinalizeDeployment-DeployPS-HPE-Legacy 8- Unmount-GeneralPS-HPE-LegacyUefi
 XenServerBasicDeployment-DeployBP-HPE-Legacy |  deploy |  Basic deployment of XenServer. Tested with 7.6. Not suitable for real Linux distros. |  1- MountAndValidate-GeneralPS-HPE-Legacy 2- PrepareForDeployment-DeployPS-HPE-Legacy 3- XenConfigureManagementNetworkNoBond-DeployPS-HPE-Legacy 4- XenConfigureHostname-DeployPS-HPE-Legacy 5- XenRestoreDisksAndStorageRepos-DeployPS-HPE-Legacy 6- FinalizeDeployment-DeployPS-HPE-Legacy 7- Unmount-GeneralPS-HPE-LegacyUefi

## Plan scripts description

Name | Type | Description
-|-|-
CleanupAfterCapture-CapturePS-HPE-Legacy | capture |  Cleans up temporary directories and files created during the Capture Golden  Image process.
FinalizeDeployment-DeployPS-HPE-Legacy | deploy |  Mainly finalize the preparation of the RC-FILE to be executed during the next  reboot of the OS-Volume.
GeneralizeHostBeforeCapture-CapturePS-HPE-Legacy | capture |  Create/populate an ImageStreamerCapture file certifying that the Golden Image  has been created properly. Performs various cleanups: network file, hostname,  fstab, /etc/hosts Tested with with RHEL7.5, CentOS 7.5, SLE 15 and XenServer  7.1, 7.6 and Ubuntu 19.04.
GeneralizeNetworkBeforeCapture-CapturePS-HPE-Legacy | capture. |  Remove network settings depending on the OS-Type before golden image capture.  Tested with RHEL 7.5, CentOS 7.5, SLE 15, XenServer 7.1, 7.6. Although Ubuntu  19.04 does not generate fatal errors, it is not well integrated.
GeneralizeUsersBeforeCapture-CapturePS-HPE-Legacy | capture |  Remove user accounts created during a previous deployment and before a new  Capture. Tested on RHEL 7.5, CentOS 7.5, SLE 15 and XenServer 7.6.
LinuxConfigureHostname-DeployPS-HPE-Legacy | deploy |  Configure hostname and populate the network directory with ifcfg-* files and  /etc/hosts. NOTE: This script MUST be executed after the  Linux-configure-multiple-NICs-Deploy Plan Script. NOTE: The hostname is  associated to the IP address of the first discovered NIC, which is shell  variable iface=${array[0]}) NOTE: Not suitable for XenServer
LinuxConfigureMultipleNICs-DeployPS-HPE-Legacy | deploy |  Configure all the NICs corresponding to the Connections defined in the OneView  Profile. The number of NICs to configure corresponds to the number of connected  NICs defined in the Server Profile. Restrictions: With this version, it is not  possible to configure less NICs than connections present in the Profile.  Moreover, the NICs to configure must be in sequence. For example It is not  possible to configure NIC1 and NIC3 and not NIC2. NOTE: For a maximum of  flexibility, when this Plan Script is included in a Build Plan, make sure, for  each NIC, you edit its Build Plan's Custom Attributes and select all the  offered possibilities: "Allow static", "Allow DHCP", "Allow no network  connection". NOTE: Not suitable for XenServer.
LinuxConfigureUsers-DeployPS-HPE-Legacy | deploy |  Set root password and create user accounts during the deployment process.  Tested successfully with RHEL 7, CentOS 7 and SLE 15 and Ubuntu 19.04. ToDo:  add support of XenServer
LinuxManageSecurityServices-DeployPS-HPE-Legacy | deploy |  Enables or Disables security services. Successfully tested on RHEL 7.5, CentOS  7.5. ToDo: Support of SLE 15. Investigate adaption to XenServer and Ubuntu
MountAndValidate-GeneralPS-HPE-Legacy | general |  Mount the root partition of the OS-Volume depending on the OS type. Suitable  for both Capture and Deploy OS Build Plans. Must be the first step of OS Build  Plans. Tested with RHEL 7, CentOS 7, XenServer 7 and Ubuntu 19.04
PrepareForDeployment-DeployPS-HPE-Legacy | deploy |  Validate the Golden Image/OS-Volume against invalid captures and prepare the RC  file to be modified by the deployment Plan Scripts. When needed, copy the  bootloader in the EFI/BOOT directory of the UEFI partition. Tested with  CentOS-1810, XenServer 7.6 and Ubuntu 19.04. Should work fine with SLE 15
Unmount-GeneralPS-HPE-LegacyUefi | general |  Unmounts all the guestfish mounted partition(s). It can be used in both Capture  and Deploy OS Build Plans, legacy or UEFI based deployment BPs.
XenConfigureHostname-DeployPS-HPE-Legacy | deploy |  Hostname configuration of XenServer as well as new UUID and certificate  generation. NOTE: Not suitable for Linux distros. It contains xe commands.
XenConfigureManagementNetworkNoBond-DeployPS-HPE-Legacy | deploy |  XenServer simple management network configuration. No bond.
XenRestoreDisksAndStorageRepos-DeployPS-HPE-Legacy | deploy |  Restore the DvD Drives, Removable storage and Local storage repositories that  may have been removed during the Golden Image creation process. Suitable for  XenServer only.
