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

export class ArtifactSorter {
  public static sortByName(obj1: any, obj2: any): number {
    // Case insensitive sort comparator
    let name1: string = obj1.name.toLowerCase();
    let name2: string = obj2.name.toLowerCase();
    if (name1 < name2) {
      return -1;
    }
    else if (name1 > name2) {
      return 1;
    }
    return 0;
  }

  public static sortBySerialNumber(obj1: any, obj2: any): number {
    let sl1:number = obj1.serialNumber;
    let sl2:number = obj2.serialNumber;
    return sl1 - sl2;
  }
}