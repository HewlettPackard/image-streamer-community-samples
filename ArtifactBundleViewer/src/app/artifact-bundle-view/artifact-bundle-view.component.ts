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
  Input,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef
} from '@angular/core';

import Prism from 'prismjs';

import { ArtifactBundle, ArtifactType } from '../../../common/ArtifactBundle';

@Component({
  selector: 'artifact-bundle-view',
  templateUrl: './artifact-bundle-view.component.html',
  styleUrls: ['./artifact-bundle-view.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtifactBundleViewComponent implements OnInit {

  @Input()
  artifactBundle: ArtifactBundle = null;

  public ArtifactType = ArtifactType;
  public openTabs: number = 0;

  // For making the right tab visible on opening an artifact
  public selectedIndex: number = 0;
  private openPlanScripts: number = 0;
  private openBuildPlans: number = 0;
  private openDeploymentPlans: number = 0;
  private openGoldenImages: number = 0;

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
    console.log(this.artifactBundle);
    this.updateOpenArtifactsCount();
  }

  private updateOpenArtifactsCount() {
    this.openPlanScripts = this.artifactBundle.planScripts.filter(artifact => { return artifact.open }).length;
    this.openBuildPlans = this.artifactBundle.buildPlans.filter(artifact => { return artifact.open }).length;
    this.openDeploymentPlans = this.artifactBundle.deploymentPlans.filter(artifact => { return artifact.open }).length;
    this.openGoldenImages = this.artifactBundle.goldenImages.filter(artifact => { return artifact.open }).length;

    this.openTabs = this.openPlanScripts + this.openBuildPlans + this.openDeploymentPlans + this.openGoldenImages;
  }

  getArtifactOpenOrder(artifacts: any[], name): number {
    let index = artifacts.filter(artifact => { return artifact.open && artifact.name.localeCompare(name) <= 0 }).length;
    console.log('open order', index - 1);
    return index - 1;
  }
  openArtifactFromChild($event){
    this.openArtifact($event.type, $event.name);
  }

  openArtifact(artifactType: ArtifactType, name: string) {
    if (artifactType == ArtifactType.PlanScript) {
      let index = this.artifactBundle.planScripts.findIndex(artifact => { return artifact.name === name });
      if (!this.artifactBundle.planScripts[index].open) {
        this.openTabs++;
        this.openPlanScripts++;
        this.artifactBundle.planScripts[index].open = true;
        //setTimeout(() => this.selectedIndex = this.getArtifactOpenOrder(this.artifactBundle.planScripts, name), 1000);
        this.selectedIndex = this.getArtifactOpenOrder(this.artifactBundle.planScripts, name);
        console.log('PS selected index', this.selectedIndex);
        console.log('Open PlanScript', name, this.artifactBundle.planScripts[index]);
      }
    }
    else if (artifactType == ArtifactType.BuildPlan) {
      let index = this.artifactBundle.buildPlans.findIndex(artifact => { return artifact.name === name });
      if (!this.artifactBundle.buildPlans[index].open) {
        this.openTabs++;
        this.openBuildPlans++;
        this.artifactBundle.buildPlans[index].open = true;
        let openOrder = this.getArtifactOpenOrder(this.artifactBundle.buildPlans, name);
        setTimeout(() => this.selectedIndex = this.openPlanScripts + openOrder, 1000);
        //this.selectedIndex = this.openPlanScripts + openOrder;
        console.log('BP selected index', this.selectedIndex);
        console.log('Open BuildPlan', name, this.artifactBundle.buildPlans[index]);
      }
    }
    else if (artifactType == ArtifactType.DeploymentPlan) {
      let index = this.artifactBundle.deploymentPlans.findIndex(artifact => { return artifact.name === name });
      if (!this.artifactBundle.deploymentPlans[index].open) {
        this.openTabs++;
        this.openDeploymentPlans++;
        this.artifactBundle.deploymentPlans[index].open = true;
        let openOrder = this.getArtifactOpenOrder(this.artifactBundle.deploymentPlans, name);        
        this.selectedIndex = this.openPlanScripts + this.openBuildPlans + openOrder;
        console.log('DP selected index', this.selectedIndex);
        console.log('Open DeploymentPlan', name, this.artifactBundle.deploymentPlans[index]);
      }
    }
    else if (artifactType == ArtifactType.GoldenImage) {
      let index = this.artifactBundle.goldenImages.findIndex(artifact => { return artifact.name === name });
      if (!this.artifactBundle.goldenImages[index].open) {
        this.openTabs++;
        this.openGoldenImages++;
        this.artifactBundle.goldenImages[index].open = true;
        let openOrder = this.getArtifactOpenOrder(this.artifactBundle.deploymentPlans, name);
        this.selectedIndex = this.openPlanScripts + this.openBuildPlans + this.openDeploymentPlans + openOrder;
        console.log('GI selected index', this.selectedIndex);
        console.log('Open GoldenImage', name, this.artifactBundle.goldenImages[index]);
      }
    }

    this.ref.detectChanges();
    return false;
  }

  closeArtifact(artifactType: ArtifactType, name: string) {
    
    if (artifactType == ArtifactType.PlanScript) {      
      let psIndex = this.artifactBundle.planScripts.findIndex(ps => { return ps.name == name });
      if (this.artifactBundle.planScripts[psIndex].open) {
        this.openTabs--;
        this.openPlanScripts--;
        this.artifactBundle.planScripts[psIndex].open = false;
        console.log('Close PlanScript', name, this.artifactBundle.planScripts[psIndex]);
      }
    } else if (artifactType == ArtifactType.BuildPlan) {
      
      let bpIndex = this.artifactBundle.buildPlans.findIndex(bp => { return bp.name == name });
      if (this.artifactBundle.buildPlans[bpIndex].open) {
        this.openTabs--;
        this.openBuildPlans--;
        this.artifactBundle.buildPlans[bpIndex].open = false;
        console.log('Close Buildplan', name, this.artifactBundle.buildPlans[bpIndex]);
      }
    } else if (artifactType == ArtifactType.DeploymentPlan) {      
      let dpIndex = this.artifactBundle.deploymentPlans.findIndex(dp => { return dp.name == name });
      if (this.artifactBundle.deploymentPlans[dpIndex].open) {
        this.openTabs--;
        this.openDeploymentPlans--;
        this.artifactBundle.deploymentPlans[dpIndex].open = false;
        console.log('Close Deployment plan', name, this.artifactBundle.deploymentPlans[dpIndex]);
      }      
    } else if (artifactType == ArtifactType.GoldenImage) {      
      let giIndex = this.artifactBundle.goldenImages.findIndex(gi => { return gi.name == name });
      if (this.artifactBundle.goldenImages[giIndex].open) {
        this.openTabs--;
        this.openGoldenImages--;
        this.artifactBundle.goldenImages[giIndex].open = false;
        console.log('Close Golden Image', name, this.artifactBundle.goldenImages[giIndex]);
      }      
    }

    this.ref.detectChanges();
    return false;
  }

  getOpenArtifacts(list) {
    let filteredList = list.filter(artifact => artifact.open);
    //console.log('filtered', filteredList);
    return filteredList;
  }
}

