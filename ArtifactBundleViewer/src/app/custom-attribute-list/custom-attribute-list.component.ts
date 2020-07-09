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

import { Component, OnInit, Input } from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import { CustomAttribute } from '../../../common/CustomAttribute';

@Component({
  selector: 'custom-attribute-list',
  templateUrl: './custom-attribute-list.component.html',
  styleUrls: ['./custom-attribute-list.component.css'],
  animations: [
    trigger('detailExpand', [
      state('collapsed', style({height: '0px', minHeight: '0', display: 'none'})),
      state('expanded', style({height: '*'})),
      transition('expanded <=> collapsed', animate('225ms cubic-bezier(0.4, 0.0, 0.2, 1)')),
    ]),
  ],
})

export class CustomAttributeListComponent implements OnInit {
  @Input()
  caList:CustomAttribute[] = [];

  @Input()
  showVisibleEditable: boolean;

  constructor() { }
  
  expandedCa: CustomAttribute;
  private columnsToDisplayForDP = ['icon','name', 'type', 'visible', 'editable', 'value'];
  private columnsToDisplayForBP = ['icon','name', 'type', 'value'];

  ngOnInit() {
  }

  getColumnNames() {
    if(this.showVisibleEditable){
      return this.columnsToDisplayForDP;
    } else {
      return this.columnsToDisplayForBP;
    }
  }
}



