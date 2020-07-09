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

import * as fs from "fs";

import { ArtifactBundle } from '../common/ArtifactBundle';
import { ExportOptions } from '../common/ExportOptions';
import { ArtifactBundleYaml } from '../common/yaml/ArtifactBundleYaml';
import { ArtifactYamlGenerator } from '../common/yaml/ArtifactYamlGenerator';

export default class ArtifactBundleExporter {

  public static export(options: ExportOptions) {
    let yaml = ArtifactYamlGenerator.generateYaml(new ArtifactBundleYaml(options.artifactBundle));

    try {
      const data = fs.writeFileSync(options.filePath, yaml);
      return true; // Success
    } catch (err) {
      console.error(err)
      return false; // Failure
    }
  }
}

export { ArtifactBundleExporter };
