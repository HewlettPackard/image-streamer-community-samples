# HPE Image Streamer Community Samples

## Description

Sample artifact bundles for use with HPE Image Streamer. The overall intent is to provide a minimum number of Plan Scripts supporting a maximum of operating system flavors and versions. Plan Script and Build Plan sources are provided in text files with a meaningful name to avoid their download and extraction to see their content.

## Support / Contributing

Community involvement is encouraged. See [CONTRIBUTING.md](CONTRIBUTING.md) for more details.

## Repo architecture overview

Object | Description
-|-
`artifact-bundles` | `.zip` artifact bundle files
`docs` | Collateral documentation files
`scripts` | Scripts used to maintain this project - i.e. sources extraction from `.zip` files and `Readme.md` generator
`src` |  Artifact bundle sources; one sub-directory per artifact bundle with a Readme.md description file.

## Object naming scheme

The following naming scheme is used for Build Plans and Plan Scripts:

```text
<DescriptionString>-<ObjectType><ObjectAcronym>-[<CompanyAcronym>]-<paradigm>
```

where

```text
<DescriptionString> : Short string describing the content of the object.
<ObjectType>        : possible values: Capture, Deploy, General
<ObjectAcronym>     : Possible values: BP (Build Plan) or PS (Plan Script)
[<CompanyAcronym>]  : Optional contributor's company acronym
<Paradigm>          : Possible values: Legacy, UEFI
```

Examples:

```text
LinuxMinimum-DeployBP-HPE-UEFI
MountUefiPartition-GeneralPS-HPE-UEFI
```
