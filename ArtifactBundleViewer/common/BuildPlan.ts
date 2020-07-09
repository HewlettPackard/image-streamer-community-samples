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

import { BuildStep } from './BuildStep';
import { CustomAttribute } from './CustomAttribute';

export class BuildPlan {
    id: string;
    name: string;
    description: string;
    buildPlanType: string;
    readOnly: boolean;
    modified: Date;
    created: Date;
    buildSteps: BuildStep[] = [];
    customAttributes: CustomAttribute[] = [];
    
    // Fields for app-use only
    open: boolean = false;

    constructor(obj) {
        // obj is from json file
        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.buildPlanType = obj.oeBuildPlanType;
        this.readOnly = obj.hpProvided;
        this.modified = obj.modified;
        this.created = obj.created;


        for (let stepObj of obj.buildStep) {
            let buildStep = new BuildStep(stepObj);
            this.buildSteps.push(buildStep);
        }

        for (let caObj of obj.customAttributes) {
            let ca = new CustomAttribute(caObj);
            this.customAttributes.push(ca);
        }
    }
}
