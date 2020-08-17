# HPE Image Streamer Community Samples

## DISCLAIMER

Contents in this image-streamer-community-samples repository are NOT supported by HPE and is for sharing of custom artefacts and tools among Image Streamer user community. For HPE supported sample OS artifacts please visit the following repositories.   

image-streamer-esxi https://github.com/HewlettPackard/image-streamer-esxi  
image-streamer-rhel https://github.com/HewlettPackard/image-streamer-rhel  
image-streamer-windows https://github.com/HewlettPackard/image-streamer-windows  
image-streamer-sles https://github.com/HewlettPackard/image-streamer-sles  

For supported Operating System versions search for the latest revision of "HPE Synergy Image Streamer Support Matrix" on https://support.hpe.com/hpesc/public/home

## Description

Sample artifact bundles for use with HPE Image Streamer. The overall intent is to provide a minimum number of Plan Scripts supporting a maximum of operating system flavors and versions. Plan Script and Build Plan sources are provided in text files with a meaningful name to avoid their download and extraction to see their content.

## Support / Contributing

Community involvement is encouraged. See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## Repo architecture overview

Object | Description
-|-
`artifact-bundles` | Directory containing `.zip` artifact bundle files
`docs` | Directory containng collateral documentation files including a description of the legacy and UEFI [paradigms](docs/ImageStreamer-LegacyAndUefiParadigms.pdf)
`scripts` | Directory containing scripts used to maintain this project - i.e. sources extraction from `.zip` files and `Readme.md` generator
`src` |  Directory containing artifact bundle sources; one sub-directory per artifact bundle with a `Readme.md` description file.
`ArtifactBundleViewer` | Directory containing the Artifict Bundle Viewer tool for multiple Operating Systems.

## Object naming conventions

Artifact bundle files have the following naming convention:

```text
<DescriptionString>-<ObjectAcronym>-<version>-[<CompanyAcronym>]-<paradigm>.zip
```

The following naming scheme is used for Build Plans and Plan Scripts:

```text
<DescriptionString>-<ObjectType><ObjectAcronym>-[<CompanyAcronym>]-<paradigm>
```

where

```text
<DescriptionString> : Short string describing the content of the object.
<ObjectType>        : possible values: Capture, Deploy, General
<ObjectAcronym>     : Possible values: AB (Artifact Bundle), BP (Build Plan) or PS (Plan Script)
<version>           : Artifact bundle version (ex: v0.2)
[<CompanyAcronym>]  : Optional contributor's company acronym
<Paradigm>          : Possible values: Legacy, UEFI and LegacyUefi (object can be used in both paradigms)
```

Examples:

```text
MountUefiPartition-GeneralPS-HPE-UEFI
LinuxMinimum-AB-HPE-UEFI.zip
LinuxMinimum-DeployBP-HPE-UEFI
Unmount-GeneralPS-HPE-LegacyUefi
```
