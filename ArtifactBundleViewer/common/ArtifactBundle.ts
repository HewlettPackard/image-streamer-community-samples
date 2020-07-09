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

import { PlanScript } from './PlanScript';
import { BuildPlan } from './BuildPlan';
import { DeploymentPlan } from './DeploymentPlan';
import { GoldenImage } from './GoldenImage';

import { ArtifactSorter } from './ArtifactSorter';

export class ArtifactBundle 
{
    public name: string = null; // Filename without extension    
    public planScripts: PlanScript[] = [];
    public buildPlans: BuildPlan[] = [];
    public deploymentPlans: DeploymentPlan[] = [];
    public goldenImages: GoldenImage[] = [];

    // Additional metadata
    public path: string = null;
    public tempDir: string = null; // Directory where bundle was extracted 

    public setPath(path: string): void {
        this.path = path;

        //this.name = /[^\/]*/.exec(path)[0];
        this.name = path.split(/\\|\//).pop().replace(/\.[^/.]+$/, "");
        console.log("AB name: ", this.name);
    }

    public sortArtifacts() : void {
        console.log("Sorting artifacts");
        // Sorts all artifacts by name (case insensitive)
        this.planScripts.sort(ArtifactSorter.sortByName);
        this.buildPlans.sort(ArtifactSorter.sortByName);
        this.deploymentPlans.sort(ArtifactSorter.sortByName);
        this.goldenImages.sort(ArtifactSorter.sortByName);
    }
}

export enum ArtifactType {
    PlanScript = 'plan-script',
    BuildPlan = 'build-plan',
    DeploymentPlan = 'deployment-plan',
    GoldenImage = 'golden-image',
    ArtifactBundle = 'artifact-bundle'
}