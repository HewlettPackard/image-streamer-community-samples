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

import { BuildStepYaml } from './BuildStepYaml';
import { CustomAttributeYaml } from './CustomAttributeYaml';

export class BuildPlanYaml {
    name: string;
    description: string;
    type: string;
    readOnly: boolean;
    steps: BuildStepYaml[] = [];
    customAttributes: CustomAttributeYaml[] = [];

    constructor(bp) {
        this.name = bp.name;
        this.description = bp.description;
        this.type = bp.buildPlanType;
        this.readOnly = bp.readOnly;

        for (let step of bp.buildSteps) {
            let buildStep = new BuildStepYaml(step);
            this.steps.push(buildStep);
        }

        for (let caObj of bp.customAttributes) {
            let ca = new CustomAttributeYaml(caObj);
            this.customAttributes.push(ca);
        }
    }
}
