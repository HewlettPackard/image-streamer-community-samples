# HPE Image Streamer Community Samples

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
