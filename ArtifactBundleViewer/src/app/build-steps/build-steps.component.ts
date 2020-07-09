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

import { Component, OnInit, Input } from '@angular/core';
import { BuildStep } from '../../../common/BuildStep';
import { PlanScript } from '../../../common/PlanScript';

@Component({
  selector: 'build-steps',
  templateUrl: './build-steps.component.html',
  styleUrls: ['./build-steps.component.css']
})
export class BuildStepsComponent implements OnInit {

  @Input()
  buildSteps: BuildStep[] = [];

  @Input()
  allPlanScripts: PlanScript[] = [];

  planScriptsType: Map<string, string> = new Map();

  columnsToDisplay = ['serialNumber', 'planScriptName', 'planScriptType'];

  constructor() { }

  ngOnInit() {
    for (let ps of this.allPlanScripts) {
      this.planScriptsType.set(ps.name, ps.planType);
    }
  }

}
