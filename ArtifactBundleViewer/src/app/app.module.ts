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

import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';

import { AppComponent } from './app.component';
import { NavbarComponent } from './navbar/navbar.component';
import { ArtifactListComponent } from './artifact-list/artifact-list.component';
import { ArtifactBundleTabsComponent } from './artifact-bundle-tabs/artifact-bundle-tabs.component';
import { ArtifactBundleViewComponent } from './artifact-bundle-view/artifact-bundle-view.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { MaterialModule } from './material.module';
import { SyntaxHighlightPipe } from './syntax-highlight/syntax-highlight.pipe';
import { BuildPlanViewComponent } from './build-plan-view/build-plan-view.component';
import { DeploymentPlanViewComponent } from './deployment-plan-view/deployment-plan-view.component';
import { GoldenImageViewComponent } from './golden-image-view/golden-image-view.component';
import { CustomAttributeListComponent } from './custom-attribute-list/custom-attribute-list.component';
import { DiffComponent } from './diff/diff.component';
import { MainComponent } from './main/main.component';
import { DiffOptionsDialogComponent } from './diff-options-dialog/diff-options-dialog.component';
import { AboutDialogComponent } from './about-dialog/about-dialog.component';
import { ExportDialogComponent } from './export-dialog/export-dialog.component';
import { LoadingDialogComponent } from './loading-dialog/loading-dialog.component';
import { CustomAttributeDetailsComponent } from './custom-attribute-details/custom-attribute-details.component';
import { CdkColumnDef } from '@angular/cdk/table';
import { CaTypePipe } from './ca-type/ca-type.pipe';
import { OrNonePipe } from './or-none/or-none.pipe';
import { PlanscriptViewComponent } from './planscript-view/planscript-view.component';
import { BuildStepsComponent } from './build-steps/build-steps.component';
import { NotificationDialogComponent } from './notification-dialog/notification-dialog.component';

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    ArtifactListComponent,
    ArtifactBundleTabsComponent,
    ArtifactBundleViewComponent,
    SyntaxHighlightPipe,
    BuildPlanViewComponent,
    DeploymentPlanViewComponent,
    GoldenImageViewComponent,
    CustomAttributeListComponent,
    DiffComponent,
    MainComponent,
    DiffOptionsDialogComponent,
    AboutDialogComponent,
    ExportDialogComponent,
    CustomAttributeDetailsComponent,
    CaTypePipe,
    LoadingDialogComponent,
    OrNonePipe,
    PlanscriptViewComponent,
    BuildStepsComponent,
    NotificationDialogComponent
  ],
  imports: [
    AppRoutingModule,
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MaterialModule
  ],
  entryComponents: [
    AboutDialogComponent,
    DiffOptionsDialogComponent,
    ExportDialogComponent,
    LoadingDialogComponent,
    NotificationDialogComponent
  ],
  providers: [CdkColumnDef],
  bootstrap: [AppComponent]
})
export class AppModule { }
