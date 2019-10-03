# Script directory

## Description

Scripts to maintain this project. 

## Content

* `ExtractArtifactSources.bash`: Extracts Build Plans and Plan Scripts from the supplied Artifact Bundle argument and post them in the `src` directory with meaningful filenames.

* `ArtifactReadmeGenerator.bash`: Generates the `src/<ArtifactName>/README.md` file associated with each artifact bundle found in the artifact-bundles directory describing Build Plans and Plan Scripts. It must be ran after the `ExtractArtifactSources.bash` script.
