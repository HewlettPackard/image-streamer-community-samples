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

import { Component, Input, OnInit, OnChanges, SimpleChanges } from '@angular/core';

import { ArtifactBundle } from '../../../common/ArtifactBundle';

@Component({
  selector: 'artifact-bundle-tabs',
  templateUrl: './artifact-bundle-tabs.component.html',
  styleUrls: ['./artifact-bundle-tabs.component.css']
})
export class ArtifactBundleTabsComponent implements OnInit {

  @Input()
  artifactBundles: Map<string, ArtifactBundle>;

  @Input()
  lastOpenedBundle: string; // path

  artifactBundleList: string[] = [];   // Paths

  selectedIndex: number = 0;

  constructor() { }

  ngOnInit() { }

  ngOnChanges(changes: SimpleChanges) {
    let newBundlePath = this.getNewlyOpenedBundle(changes);
    console.log(newBundlePath);
    if (newBundlePath != null) {
      let index = this.artifactBundleList.indexOf(newBundlePath);
      if (index < 0) {
        this.artifactBundleList.push(newBundlePath);
        this.selectedIndex = this.artifactBundles.size - 1;
      }
      else {
        this.selectedIndex = index;
      }
    }    
    else if (this.lastOpenedBundle) {
      // Bundle already open
      this.selectedIndex = this.artifactBundleList.indexOf(this.lastOpenedBundle);
    }
  }

  closeBundle(path: string) {
    console.log("Close Bundle", path);
    this.artifactBundles.delete(path);
    let index: number = this.artifactBundleList.indexOf(path);
    this.artifactBundleList.splice(index, 1);
    // TODO: Send electron event to clean up?
    return false;
  }

  getNewlyOpenedBundle(changes: SimpleChanges): string {
    let oldList: any = this.artifactBundleList || [];
    let newList = Array.from(changes['artifactBundles'].currentValue.keys());
    
    if (newList.length > oldList.length) {
      let newBundlePath= newList.filter(x => !oldList.includes(x))[0];
      console.log('newBundlePath', newBundlePath);
      return "" + newBundlePath;
    }
    else {
      return null;
    }
  }

}
