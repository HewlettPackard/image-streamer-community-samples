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

import 'prismjs';
import 'prismjs/components/prism-bash';
import 'prismjs/plugins/line-numbers/prism-line-numbers';

declare var Prism: any;
//import loadLanguages from 'prismjs/components';
//loadLanguages(['bash']);

@Pipe({
  name: 'syntaxHighlight'
})
export class SyntaxHighlightPipe implements PipeTransform {

  transform(code: string, args?: any): any {
    return Prism.highlight(code, Prism.languages.bash, 'bash');
  }
}
