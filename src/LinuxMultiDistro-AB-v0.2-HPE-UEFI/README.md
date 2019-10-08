# Artifact description and content

## Description

Artifact Name:LinuxMultiDistro-AB-v0.2-HPE-UEFI

Description:Build Plans and Plan Scripts for capturing and deploying various flavors of Linux oriented OSs including XenServer, CentOS, RHEL, SLES and Ubuntu

Read Only:false

Time Stamp:2019-10-03T16:07:57.497Z

Artifact Type:USER

## Build Plans description

Name | Type | Description | Steps
-|-|-|-
 LinuxBasicDeploment-DeployBP-HPE-UEFI |  deploy |  Deploys different Linux flavors with basic customization. Tested with RHEL7, CentOS7, SLES12 and 15, Ubuntu 19.04. Not suitable for XenServer. |  1- MountUefiPartition-GeneralPS-HPE-UEFI 2- PrepareForDeployment-DeployPS-HPE-UEFI 3- FinalizeDeployment-DeployPS-HPE-UEFI 4- Unmount-GeneralPS-HPE-LegacyUefi
 LinuxCapture-CaptureBP-HPE-UEFI |  capture |  Captures and creates Linux Golden Images without any OS generalization. Suitable for many Linux distros including RHEL7, CentOS7, XenServer7, Ubuntu 19.04, SLES12 and 15. |  1- MountUefiPartition-GeneralPS-HPE-UEFI 2- PrepareForCapture-CapturePS-HPE-UEFI 3- Unmount-GeneralPS-HPE-LegacyUefi
 LinuxMinimumDeployment-DeployBP-HPE-UEFI |  deploy |  Deploy a Golden Image deployment with no customization. The only thing done in the Finalize step is the cleanup of the RC-FILE after the first reboot of the deployed server. |  1- MountUefiPartition-GeneralPS-HPE-UEFI 2- PrepareForDeployment-DeployPS-HPE-UEFI 3- FinalizeDeployment-DeployPS-HPE-UEFI 4- Unmount-GeneralPS-HPE-LegacyUefi
 XenServerMinimumDeployment-DeployBP-HPE-UEFI |  deploy |  Suitable for XenServer only. Tested with XenServer 7.6 |  1- MountUefiPartition-GeneralPS-HPE-UEFI 2- PrepareForDeployment-DeployPS-HPE-UEFI 3- FinalizeDeployment-DeployPS-HPE-UEFI 4- Unmount-GeneralPS-HPE-LegacyUefi

## Plan scripts description

Name | Type | Description
-|-|-
FinalizeDeployment-DeployPS-HPE-UEFI | deploy |  Clean up the RC-FILE to avoid errors upon each reboot of the deployed server.
MountUefiPartition-GeneralPS-HPE-UEFI | general |  Mount the UEFI vfat partition of the OS-Volume. Suitable for both Capture and  Deploy OS Build Plans. Must be the first step of OS Build Plans.
PrepareForCapture-CapturePS-HPE-UEFI | capture |  Creates various directories in the guestfish mounted UEFI partition. This Plan  Script should be called just after the Mount-capturePS plan script.
PrepareForDeployment-DeployPS-HPE-UEFI | deploy |  Perform various OS dependent actions Tested with CentOS 7, SLE 15, XenServer  7.6, Ubuntu 19.04
Unmount-GeneralPS-HPE-LegacyUefi | general |  Unmounts all the guestfish mounted partition(s). It can be used in both Capture  and Deploy OS Build Plans, legacy or UEFI based deployment BPs.
