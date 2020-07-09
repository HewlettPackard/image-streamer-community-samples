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

import { CustomAttributeYaml } from './CustomAttributeYaml';
import { CustomAttribute } from '../CustomAttribute';
import { DeploymentPlan } from '../DeploymentPlan';

export class DeploymentPlanYaml {
    public name: string;
    public description: string;
    public readOnly: boolean;
    public goldenImage: string;
    public buildPlan: string;
    public customAttributes: CustomAttribute[] = [];

    constructor(dp: DeploymentPlan) {
        this.name = dp.name;
        this.description = dp.description;
        this.readOnly = dp.readOnly;
        this.goldenImage = dp.goldenImageName;
        this.buildPlan = dp.buildPlanName;

        for (let caObj of dp.customAttributes) {
            let ca = new CustomAttributeYaml(caObj);
            this.customAttributes.push(ca);
        }
    }
}
