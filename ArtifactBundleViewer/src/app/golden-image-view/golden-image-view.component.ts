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

import { Component, Input, OnInit } from '@angular/core';

import { GoldenImage } from '../../../common/GoldenImage';

@Component({
  selector: 'golden-image-view',
  templateUrl: './golden-image-view.component.html',
  styleUrls: ['./golden-image-view.component.css']
})
export class GoldenImageViewComponent implements OnInit {

  @Input()
  goldenImage: GoldenImage;

  constructor() { }

  ngOnInit() {
  }

}
