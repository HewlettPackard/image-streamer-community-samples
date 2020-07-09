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

export class GoldenImage {
    public id: string;
    public name: string;
    public description: string;
    public size: BigInteger;
    public created: Date;
    public modified: Date;
    public checkSum: string;
    public readOnly: boolean;

    // Fields for app-use only
    open: boolean = false;

    constructor(obj) {
        this.id = obj.id;
        this.name = obj.name;
        this.description = obj.description;
        this.size = obj.size;
        this.created = obj.created;
        this.modified = obj.modified;
        this.checkSum=obj.checkSum;
        this.readOnly=obj.readOnly;

    }
}