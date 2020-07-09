/**
 * (c) Copyright 2019-20 Hewlett Packard Enterprise Development LP
 *
 * Licensed under the Apache License, Version 2.0(the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software distributed
 * under the License is distributed on an "AS IS" BASIS, WITHOUT WARRANTIES OR
 * CONDITIONS OF ANY KIND, either express or implied.See the License for the
 * specific language governing permissions and limitations under the License
 */

import { PlanScript } from '../common/PlanScript';
import { BuildPlan } from '../common/BuildPlan';
import { DeploymentPlan } from '../common/DeploymentPlan';
import { GoldenImage } from '../common/GoldenImage';
import { ArtifactBundle } from '../common/ArtifactBundle';

import * as fs from "fs";
import * as fsExtra from "fs-extra";
import * as os from "os";
import * as path from "path";
import * as unzipper from "unzipper";

export default class ArtifactBundleReader {
  private tempDir: string = null;
  private filePath;
  private mainWindow: Electron.BrowserWindow;

  private artifactBundle: ArtifactBundle = new ArtifactBundle();

  private static openBundleTempDirs: string[] = [];

  constructor(window: Electron.BrowserWindow, filePath: String) {
    this.mainWindow = window;
    this.filePath = filePath;
  }

  public open(): void {
    this.createTempDir();
    this.extractBundle();
  }

  public read(): ArtifactBundle {
    return null;
  }

  public close(): void {
    this.deleteTempDir();
  }

  public static closeAll(): void {
    for (const dir of ArtifactBundleReader.openBundleTempDirs) {
      console.log("Deleting temp dir " + dir);
      fsExtra.removeSync(dir);
    }
  }

  private isPlanScriptFile(name: string): boolean {
    return name.search('_planscript.json$') !== -1;
  }

  private isBuildPlanFile(name: string): boolean {
    return name.search('_buildplan.json$') !== -1;
  }

  private isDeploymentPlanFile(name: string): boolean {
    return name.search('_deploymentplan.json$') !== -1;
  }

  private isGoldenImageFile(name: string): boolean {
    return name.search("_goldenimage.json$") != -1;
  }

  private createTempDir(): void {
    try {
      this.tempDir = fs.mkdtempSync(path.join(os.tmpdir(), 'abviewer-'));
      console.log("Temp directory: " + this.tempDir);
    }
    catch (err) {
      this.tempDir = null;
      console.log("Error: Could not create temp dir for artifact bundle");
    }
  }

  private deleteTempDir(): void {
    if (this.tempDir && this.tempDir.includes('abviewer-')) {
      console.log("Removing temp directory " + this.tempDir);
      fsExtra.removeSync(this.tempDir);
    }
  }

  private extractBundle(): void {
    let tempDir = this.tempDir;    
    ArtifactBundleReader.openBundleTempDirs.push(tempDir);
    let abReader = this;
    const promise = new Promise(function (resolve, reject) {
      abReader.artifactBundle.setPath(abReader.filePath);
      abReader.artifactBundle.tempDir = tempDir;

      abReader.mainWindow.webContents.send('load-bundle-start', abReader.artifactBundle.name + ".zip");

      const fileSizes: Map<string, BigInteger> = new Map(); // name - size

      fs.createReadStream(abReader.filePath)
        .pipe(unzipper.Parse())
        .on('entry', function (entry) {
          let fileName: string = entry.path;
          let type = entry.type; // 'Directory' or 'File'
          let size = entry.vars.uncompressedSize;     
          fileSizes.set(fileName, size);

          if (fileName.match("\.(json|MF|sha256sum)$")) {
            // Do not extract golden images
            console.log(fileName);
            console.log(path.join("" + tempDir, "" + fileName));
            let filePath = path.join(tempDir, fileName);
            entry.pipe(fs.createWriteStream(filePath)).on('finish', function () {
              console.log('finish 1');
              if (fileName.match("\.(json)$")) {
                let json = fs.readFileSync(filePath, { encoding: 'utf-8' });
                let obj = JSON.parse(json);
                console.log('=== ' + fileName);
                //console.log(obj);  
                if (abReader.isPlanScriptFile(fileName)) {
                  let planScript: PlanScript = new PlanScript(obj);
                  abReader.artifactBundle.planScripts.push(planScript);
                  //console.log(abReader.artifactBundle);
                }
                else if (abReader.isBuildPlanFile(fileName)) {
                  let buildPlan: BuildPlan = new BuildPlan(obj);
                  abReader.artifactBundle.buildPlans.push(buildPlan);
                }
                else if (abReader.isDeploymentPlanFile(fileName)) {
                  let deploymentPlan: DeploymentPlan = new DeploymentPlan(obj);
                  abReader.artifactBundle.deploymentPlans.push(deploymentPlan);
                }
                else if (abReader.isGoldenImageFile(fileName))
                {
                  if (obj && fileSizes.has(obj.name)) {
                    obj.size = size;
                  }

                  let goldenImage: GoldenImage = new GoldenImage(obj);
                  abReader.artifactBundle.goldenImages.push(goldenImage);    
                }
              }
            });
          } else {
            entry.autodrain();
          }

        }).on('finish', function () {
          //console.log('artifact bundle', abReader.artifactBundle); 
          console.log('finish 2');
          setTimeout(() => {
            abReader.artifactBundle.sortArtifacts();

            // Set size of all GIs - Not working since uncompressedSize is zero
            abReader.artifactBundle.goldenImages = abReader.artifactBundle.goldenImages.map((gi, index) => {
              const newGi = {...gi};
              newGi.size = fileSizes.get(gi.name);
              return newGi;
            });
            console.log('golden images after adding size: ', abReader.artifactBundle.goldenImages);

            resolve();
          }, 500);
          //}).on('end', function() {
          //    console.log('end');
          //    console.log('artifact bundle', abReader.artifactBundle); 
        }).on('close', function () {
          console.log('close');
        });
    });

    promise.then(function () {
      //console.log('load-bundle', abReader.artifactBundle);
      abReader.mainWindow.webContents.send('load-bundle', abReader.artifactBundle);
      //console.log('artifact bundle', abReader.artifactBundle); 
    })
  }
}

export { ArtifactBundleReader };