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

export class CustomAttribute 
{
    public name: string;
    public description: string;    
    public type: string;
    public value: string;
    public constraints: any;

    // For DeploymentPlan
    public visible: boolean;
    public editable: boolean;

    constructor(obj) 
    {
        this.name = obj.name;
        this.description = obj.description;
        this.type = obj.type;
        this.value = obj.value;
        this.constraints = JSON.parse(obj.constraints);

        if ("visible" in obj) 
        {
            this.visible = obj.visible;            
        }

        if ("editable" in obj) 
        {
            this.editable = obj.editable;            
        }
    }
}