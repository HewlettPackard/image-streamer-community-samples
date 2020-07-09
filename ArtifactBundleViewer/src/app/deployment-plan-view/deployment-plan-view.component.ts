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

import { Component, Input, OnInit, Output, EventEmitter } from '@angular/core';

import { DeploymentPlan } from '../../../common/DeploymentPlan';
import { ArtifactType } from '../../../common/ArtifactBundle';


@Component({
  selector: 'deployment-plan-view',
  templateUrl: './deployment-plan-view.component.html',
  styleUrls: ['./deployment-plan-view.component.css']
})
export class DeploymentPlanViewComponent implements OnInit {

  @Input()
  deploymentPlan: DeploymentPlan;

  @Output()
  openArtifact:EventEmitter<any> = new EventEmitter();

  constructor() { }
  openArtifacts(type:String ){
    let artifactType : String, artifactName: String;
    if(type == "BP"){
      artifactType = ArtifactType.BuildPlan;
      artifactName = this.deploymentPlan.buildPlanName;
    } else if( type == "GI"){
      artifactType = ArtifactType.GoldenImage;
      artifactName = this.deploymentPlan.goldenImageName;
    }

    this.openArtifact.emit( {type: artifactType, name : artifactName});
  }
  ngOnInit() {
  }

}
