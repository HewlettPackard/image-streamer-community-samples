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

import {
  Component,
  ChangeDetectorRef,
  NgZone,
  OnInit
} from '@angular/core';

import { IpcRenderer } from "electron";

import * as Diff from 'diff';
import { Diff2Html } from 'diff2html';

import { PlanScript } from '../../../common/PlanScript';
import { BuildPlan } from '../../../common/BuildPlan';
import { DeploymentPlan } from '../../../common/DeploymentPlan';
import { GoldenImage } from '../../../common/GoldenImage';
import { ArtifactBundle, ArtifactType } from '../../../common/ArtifactBundle';
import { DiffOptions } from '../../../common/DiffOptions';

import { BuildPlanYaml } from '../../../common/yaml/BuildPlanYaml';
import { DeploymentPlanYaml } from '../../../common/yaml/DeploymentPlanYaml';
import { ArtifactBundleYaml } from '../../../common/yaml/ArtifactBundleYaml';
import { ArtifactYamlGenerator } from '../../../common/yaml/ArtifactYamlGenerator';

@Component({
  selector: 'diff',
  templateUrl: './diff.component.html',
  styleUrls: ['./diff.component.css']
})
export class DiffComponent implements OnInit {

  private ipcRenderer: IpcRenderer;
  diffOptions: DiffOptions;
  diffHtml: string;

  diff2htmlOptions = {
    inputFormat: "diff",
    showFiles: false,
    matching: "words",
    outputFormat: "side-by-side",
    synchronisedScroll: true  // TODO: Needs Diff2HtmlUI
  };

  constructor(private zone: NgZone, private ref: ChangeDetectorRef /*, private _differs: KeyValueDiffers */) {
    if ((<any>window).require) {
      try {
        this.ipcRenderer = (<any>window).require("electron").ipcRenderer;
      } catch (error) {
        throw error;
      }
    } else {
      console.warn("Could not load electron ipc");
    }

    this.ipcRenderer.on('show-diff-content', (event, diffOptions) => {
      console.log('show-diff-content 1', diffOptions);
      this.zone.run(() => {
        console.log('show-diff-content', diffOptions);
        this.diffOptions = diffOptions;
        this.generateDiffHtml();
      });
    });

  }

  generatePlanScriptDiff() {
    let leftPS: PlanScript = this.diffOptions.leftPS;
    let rightPS: PlanScript = this.diffOptions.rightPS;
    let diffText = Diff.createTwoFilesPatch(leftPS.name,
      rightPS.name,
      leftPS.content,
      rightPS.content,
      `(${this.diffOptions.leftBundleName}.zip)`,
      `(${this.diffOptions.rightBundleName}.zip)`,
      {
        context: 2000000
      });

    this.diffHtml = Diff2Html.getPrettyHtml(diffText, this.diff2htmlOptions);
  }

  generateBuildPlanDiff() {
    let leftBP: BuildPlan = this.diffOptions.leftBP;
    let rightBP: BuildPlan = this.diffOptions.rightBP;
    let diffText = Diff.createTwoFilesPatch(leftBP.name,
      rightBP.name,
      ArtifactYamlGenerator.generateYaml(new BuildPlanYaml(leftBP)),
      ArtifactYamlGenerator.generateYaml(new BuildPlanYaml(rightBP)),
      `(${this.diffOptions.leftBundleName}.zip)`,
      `(${this.diffOptions.rightBundleName}.zip)`,
      {
        context: 2000000
      });

    this.diffHtml = Diff2Html.getPrettyHtml(diffText, this.diff2htmlOptions);
  }

  generateDeploymentPlanDiff() {
    let leftDP: DeploymentPlan = this.diffOptions.leftDP;
    let rightDP: DeploymentPlan = this.diffOptions.rightDP;
    let diffText = Diff.createTwoFilesPatch(leftDP.name,
      rightDP.name,
      ArtifactYamlGenerator.generateYaml(new DeploymentPlanYaml(leftDP)),
      ArtifactYamlGenerator.generateYaml(new DeploymentPlanYaml(rightDP)),
      `(${this.diffOptions.leftBundleName}.zip)`,
      `(${this.diffOptions.rightBundleName}.zip)`,
      {
        context: 2000000
      });

    this.diffHtml = Diff2Html.getPrettyHtml(diffText, this.diff2htmlOptions);
  }

  generateArtifactBundleDiff() {
    let leftAB: ArtifactBundle = this.diffOptions.leftAB;
    let rightAB: ArtifactBundle = this.diffOptions.rightAB;

    let diffText = Diff.createTwoFilesPatch(leftAB.name,
      rightAB.name,
      ArtifactYamlGenerator.generateYaml(new ArtifactBundleYaml(leftAB)),
      ArtifactYamlGenerator.generateYaml(new ArtifactBundleYaml(rightAB)),
      `(${this.diffOptions.leftBundleName}.zip)`,
      `(${this.diffOptions.rightBundleName}.zip)`,
      {
        context: 2000000
      });

    this.diffHtml = Diff2Html.getPrettyHtml(diffText, this.diff2htmlOptions);
  }

  generateDiffHtml() {
    switch(this.diffOptions.type) {
      case ArtifactType.PlanScript:
        this.generatePlanScriptDiff();
        break;
      case ArtifactType.BuildPlan:
        this.generateBuildPlanDiff();
        break;
      case ArtifactType.DeploymentPlan:
        this.generateDeploymentPlanDiff();
        break;
      case ArtifactType.ArtifactBundle:
        this.generateArtifactBundleDiff();
        break;
    }
  }

  ngOnInit() {
  }

}
