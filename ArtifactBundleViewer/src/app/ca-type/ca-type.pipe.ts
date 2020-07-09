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

import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'caType'
})
export class CaTypePipe implements PipeTransform {

  transform(type: String, args?: any): any {
    switch (type) {
      case 'string':{
        return "String";
      }
      case 'number':{
        return "Number";
      }
      case 'option':{
        return "Option";
      }
      case 'password':{
        return "Password";
      }
      case 'nic':{
        return "NIC";
      }
      case 'ipv4':{
        return "IPv4 Address";
      }
      case 'hostname':{
        return "Hostname";
      }
      case 'fqdn':{
        return "FQDN";
      }
    }
  }

}
