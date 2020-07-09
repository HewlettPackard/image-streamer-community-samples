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

import { ArtifactType, ArtifactBundle } from './ArtifactBundle';
import { PlanScript } from './PlanScript';
import { BuildPlan } from './BuildPlan';
import { DeploymentPlan } from './DeploymentPlan';
import { GoldenImage } from './GoldenImage';

export class DiffOptions {
    type: ArtifactType;

    leftPS: PlanScript;
    rightPS: PlanScript;

    leftBP: BuildPlan;
    rightBP: BuildPlan;

    leftDP: DeploymentPlan;
    rightDP: DeploymentPlan;

    leftGI: GoldenImage;
    rightGI: GoldenImage;

    leftAB: ArtifactBundle;
    rightAB: ArtifactBundle;

    leftBundleName: string;
    rightBundleName: string; 
    
    constructor() {
        this.type = ArtifactType.PlanScript;        
    }
}