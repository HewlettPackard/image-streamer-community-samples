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

import {
  Component,
  Inject,
  OnInit
} from '@angular/core';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { FormBuilder, FormGroup } from '@angular/forms';

import { ArtifactBundle, ArtifactType } from '../../../common/ArtifactBundle';
import { DiffOptions } from '../../../common/DiffOptions';

@Component({
  selector: 'diff-options-dialog',
  templateUrl: './diff-options-dialog.component.html',
  styleUrls: ['./diff-options-dialog.component.css']
})
export class DiffOptionsDialogComponent implements OnInit {

  //artifactBundles: Map<string, ArtifactBundle>;

  formOptions: FormGroup;

  constructor(public dialogRef: MatDialogRef<DiffOptionsDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    fb: FormBuilder) {
    console.log('diff data', data);
    this.formOptions = fb.group({
      artifactType: ArtifactType.PlanScript,
      artifactBundle1: '',
      artifactBundle2: '',
      planScript1: '',
      planScript2: '',
      buildPlan1: '',
      buildPlan2: '',
      deploymentPlan1: '',
      deploymentPlan2: ''
    });
  }

  ngOnInit() {
  }

  closeDialog() {
    this.dialogRef.close(null);
  }

  onCompare(): DiffOptions {
    console.log('formOptions', this.formOptions.value);
    let options: DiffOptions = new DiffOptions();
    options.type = this.formOptions.value.artifactType;

    let selectedFormOptions = this.formOptions.value;
    let ab1: ArtifactBundle = this.data.artifactBundles.get(selectedFormOptions.artifactBundle1);
    let ab2: ArtifactBundle = this.data.artifactBundles.get(selectedFormOptions.artifactBundle2);

    options.leftBundleName = ab1.name;
    options.rightBundleName = ab2.name;

    if (!this.validate()) {
      return;
    }

    switch (options.type) {
      case ArtifactType.PlanScript:
        options.leftPS = ab1.planScripts.filter(ps => ps.name == selectedFormOptions.planScript1)[0];
        options.rightPS = ab2.planScripts.filter(ps => ps.name == selectedFormOptions.planScript2)[0];
        break;
      case ArtifactType.BuildPlan:
        options.leftBP = ab1.buildPlans.filter(bp => bp.name == selectedFormOptions.buildPlan1)[0];
        options.rightBP = ab2.buildPlans.filter(bp => bp.name == selectedFormOptions.buildPlan2)[0];
      case ArtifactType.DeploymentPlan:
        options.leftDP = ab1.deploymentPlans.filter(dp => dp.name == selectedFormOptions.deploymentPlan1)[0];
        options.rightDP = ab2.deploymentPlans.filter(dp => dp.name == selectedFormOptions.deploymentPlan2)[0];
      case ArtifactType.ArtifactBundle:
        options.leftAB = ab1;
        options.rightAB = ab2;
        break;
    }

    this.dialogRef.close(options);
    return options;
  }

  validate(): boolean {
    let valid = true;

    let options = this.formOptions.value;    
    if (options.ab1 == options.ab2) {
      if (options.artifactType == ArtifactType.PlanScript && options.planScript1 == options.planScript2) {
        this.formOptions.controls['planScript2'].setErrors({ 'incorrect': true });
        valid = false;
      }
      else {
        this.formOptions.controls['planScript2'].setErrors(null);
      }

      if (options.artifactType == ArtifactType.BuildPlan && options.buildPlan1 == options.buildPlan2) {
        this.formOptions.controls['buildPlan2'].setErrors({ 'incorrect': true });
        valid = false;
      }       
      else {
        this.formOptions.controls['buildPlan2'].setErrors(null);
      }

      if (options.artifactType == ArtifactType.DeploymentPlan && options.deploymentPlan1 == options.deploymentPlan2) {
        this.formOptions.controls['deploymentPlan2'].setErrors({ 'incorrect': true });
        valid = false;
      }        
      else {
        this.formOptions.controls['deploymentPlan2'].setErrors(null); 
      }
    }

    return this.validateIfSameBundle();
  }

  validateIfSameBundle(): boolean {
    
    // TODO: Fix
    return true;
    
    let options = this.formOptions.value;
    if (options.ab1 == options.ab2 && options.artifactType == ArtifactType.ArtifactBundle) {
      this.formOptions.controls['artifactBundle2'].setErrors({ 'incorrect': true });
      return false;
    }
    else {
      this.formOptions.controls['artifactBundle2'].setErrors(null);
      return true;
    }
  }

  // validateIfSameBundleSelected() : boolean {
  //   let options = this.formOptions.value;
  //   return options.artifactType == 'artifact-bundle' && options.artifactBundle1 == options.artifactBundle2;
  // }
}
