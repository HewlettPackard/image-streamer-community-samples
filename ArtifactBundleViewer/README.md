# ABSee - Image Streamer Artifact Bundle Viewer #

# Downloads
The latest version of ABSee can be downloaded from [Releases](https://github.com/HewlettPackard/image-streamer-community-samples/releases) page

# Description

ABSee is a standalone, cross-platform desktop application to view, compare and export (to a human readable format) Image Streamer artifact bundles.

It provides the following benefits:

- **Standalone desktop application. Faster.** No hassle of finding an appliance, uploading and extracting the artifact bundle on the appliance. Start viewing the artifact bundle in seconds!
- **No clutter. No cleanup required.** When an artifact bundle is extracted on the appliance, the numerous plan scripts, build plans, deployment plans or golden images have to be manually deleted from the appliance which is very time consuming. No such problems with ABSee.
- **Directly view multiple bundles at the same time.** Multiple bundle contents are displayed separately so even similar bundles can be viewed at the same time without the confusion that could arise from extracting two similar bundles on an appliance.
- **Compare different artifacts and bundles.** Compare individual artifacts from same or different bundle, or compare two different bundles and see exactly what changed. Great for finding out what has changed in a newer version of the bundle. Image Streamer appliance provides no such feature.
- **Export Bundle.** ABSee lets you export the entire bundle (except golden image contents) in human-readable YAML format which can also be version controlled for tracking changes.
- **Syntax Highlighting.** ABSee provides limited syntax highlighting for plan scripts which is better than the plain-text view provided by the Plan Scripts page on Image Streamer appliance.
- **Available for Windows, MacOS and Linux.** You can download a version for your OS and platform.

# Developers

ABSee was created by:

- Sumeet Lokhande (E-mail: sumeet.sl@hpe.com, Github: sumeetsl)
- Pragya Hazari (E-mail: pragya.hazari@hpe.com, Github: HazariPragya)
- Ashutosh Dash (E-mail: ashutosh.dash@hpe.com, Github: punditashu1)

# Known Issues

1. Sometimes newly opened artifact tab may not be selected on opening and will require manually switching to the new tab.


# Screenshots #
### Main window
![image](https://user-images.githubusercontent.com/20885834/87035082-74990880-c206-11ea-8065-8153b071d485.png)

### Artifact view
![image](https://user-images.githubusercontent.com/20885834/87034199-1586c400-c205-11ea-9c65-aafe8979fcad.png)

### Compare Options
![image](https://user-images.githubusercontent.com/20885834/87034763-02282880-c206-11ea-95a3-98c46c24a7bb.png)

### Diff Sample
![image](https://user-images.githubusercontent.com/20885834/87034811-110edb00-c206-11ea-803c-b7ee45639796.png)

### Export Option
![image](https://user-images.githubusercontent.com/20885834/87034851-1cfa9d00-c206-11ea-9826-55d2934a56e9.png)


# Building the application

**Production Build**

Run `npm run build-prod` and optionally `npm run electron` to start the application.
To package the application, run `npm run win-package` after the previous step for Windows X64, `npm run linux-x64-package` for Linux x64 and `npm run macos-x64-package` for MacOS.
The directory containing the executable and binaries will be created in the parent directory of the directory containing package.json

**Developer Build**

Run `npm run build` to build the project and `npm run electron` to start the application.

For testing only Angular specific changes, instead of `npm run build`, run `tsc -w` in one command prompt and `ng build --watch=true` in another. After every code change, refresh the UI in Dev Tools window (which automatically opens) using F5. This will not work if common or electron specific changes are made in which case, close the app and run `npm run electron` again.

# License
Apache 2.0