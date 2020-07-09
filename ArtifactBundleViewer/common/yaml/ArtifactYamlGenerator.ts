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

import * as yaml from 'js-yaml';

export class ArtifactYamlGenerator {

    public static generateYaml(artifact: any) {
        return yaml.safeDump(artifact, {
            sortKeys: ArtifactYamlGenerator.sortKeys
        });
    }

    public static sortKeys(a, b): number {
        // Comparator for sorting fields in YAML
        let key1Order = ArtifactYamlGenerator.sortOrder.has(a) ? ArtifactYamlGenerator.sortOrder.get(a) : 10000;
        let key2Order = ArtifactYamlGenerator.sortOrder.has(b) ? ArtifactYamlGenerator.sortOrder.get(b) : 10001;
        return key1Order - key2Order;
    }

    static sortOrder: Map<string, number> = new Map([ 
        ["serialNumber", 1],
        ["name", 10],
        ["description", 11],
        ["type", 12],
        ["readOnly", 13],
        ["content", 20],  // PS

        ["deploymentPlans", 30],
        ["buildPlans", 31],
        ["goldenImages", 32],
        ["planScripts", 33],

        ["goldenImage", 34],
        ["buildPlan", 35],        

        // Build Steps
        ["buildSteps", 50],
        ["steps", 50],
        ["customAttributes", 70],

        // Custom Attributes
        ["value", 100],
        ["editable", 101],
        ["visible", 102],
        ["constraints", 103],

        // Constraints
        ["helpText", 1000],
        ["regex", 1001],
        ["minimum", 1002],
        ["maximum", 1003],
        ["increment", 1004],
        ["unit", 1005],
        ["minlen", 1006],
        ["maxlen", 1007],
        ["allowedchars", 1008],
        ["options", 1009],
        ["ipv4static", 1010],
        ["ipv4dhcp", 1011],
        ["ipv4disable", 1012],
        ["parameters", 1013]
    ]
    );
}