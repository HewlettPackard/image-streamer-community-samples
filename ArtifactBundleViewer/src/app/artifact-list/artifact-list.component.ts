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

import { Component,
  Input,
  OnInit,
  ChangeDetectionStrategy,
  ChangeDetectorRef } from '@angular/core';

import { ArtifactType } from '../../../common/ArtifactBundle';

@Component({
  selector: 'artifact-list',
  templateUrl: './artifact-list.component.html',
  styleUrls: ['./artifact-list.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ArtifactListComponent implements OnInit {
  @Input()
  title: string;

  @Input()
  category: ArtifactType;

  @Input()
  artifactList: any[];

  constructor(private ref: ChangeDetectorRef) { }

  ngOnInit() {
  }

  openArtifact(artifactType: ArtifactType, name: string) {
    if (artifactType == ArtifactType.PlanScript) {
       let psIndex = this.artifactList.findIndex (ps => { return ps.name == name });
       this.artifactList[psIndex].open = true;
       console.log('Open PlanScript', name, this.artifactList[psIndex]);
    }
    this.ref.detectChanges();
    return false;
  }

  closeArtifact(artifactType: ArtifactType, name: string) {
    if (artifactType == ArtifactType.PlanScript) {
      let psIndex = this.artifactList.findIndex (ps => { return ps.name == name });
      this.artifactList[psIndex].open = false;
      console.log('Close PlanScript', name, this.artifactList[psIndex]);
   }
   this.ref.detectChanges();
   return false;
  }

  getOpenArtifacts(list) {
    let filteredList = list.filter(artifact => artifact.open );
    console.log('filtered', filteredList);
    return filteredList;
  }
}
