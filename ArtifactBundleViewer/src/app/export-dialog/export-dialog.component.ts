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

import { Component, Inject, OnInit } from '@angular/core';

import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

@Component({
  selector: 'export-dialog',
  templateUrl: './export-dialog.component.html',
  styleUrls: ['./export-dialog.component.css']
})
export class ExportDialogComponent implements OnInit {

  formOptions: FormGroup;

  constructor(public dialogRef: MatDialogRef<ExportDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    fb: FormBuilder) {
    this.formOptions = fb.group({
      artifactBundle: ''
    });
  }

  ngOnInit() {
  }


  closeDialog() {
    this.dialogRef.close(null);
  }

  onExport() {
    console.log('formOptions', this.formOptions.value);
    //let ab: ArtifactBundle = this.data.artifactBundles.get(selectedFormOptions.artifactBundle);
    let options = {
      path: this.formOptions.value.artifactBundle
    }

    this.dialogRef.close(options);
  }
}
