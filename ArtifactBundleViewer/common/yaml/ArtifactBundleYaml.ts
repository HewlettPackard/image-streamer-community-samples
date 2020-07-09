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

import { PlanScriptYaml } from './PlanScriptYaml';
import { BuildPlanYaml } from './BuildPlanYaml';
import { DeploymentPlanYaml } from './DeploymentPlanYaml';
import { GoldenImageYaml } from './GoldenImageYaml';

import { ArtifactBundle } from '../ArtifactBundle';

export class ArtifactBundleYaml
{
    public name: string = null; // Filename without extension
    public planScripts: PlanScriptYaml[] = [];
    public buildPlans: BuildPlanYaml[] = [];
    public deploymentPlans: DeploymentPlanYaml[] = [];
    public goldenImages: GoldenImageYaml[] = [];

    public constructor(ab: ArtifactBundle) {
        this.name = ab.name;
        for (let ps of ab.planScripts) {
            this.planScripts.push(new PlanScriptYaml(ps));
        }

        for (let bp of ab.buildPlans) {
            this.buildPlans.push(new BuildPlanYaml(bp));
        }

        for (let dp of ab.deploymentPlans) {
            this.deploymentPlans.push(new DeploymentPlanYaml(dp));
        }

        for (let gi of ab.goldenImages) {
            this.goldenImages.push(new GoldenImageYaml(gi));
        }
    }
}
