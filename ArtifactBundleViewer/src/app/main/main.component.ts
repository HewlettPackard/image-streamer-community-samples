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
  ChangeDetectorRef,
  NgZone,
  OnInit } from '@angular/core';

import { IpcRenderer } from "electron";

import { ArtifactBundle } from '../../../common/ArtifactBundle';
import { DiffOptions } from '../../../common/DiffOptions';
import { ExportOptions } from '../../../common/ExportOptions';

import { DiffOptionsDialogComponent } from '../diff-options-dialog/diff-options-dialog.component';
import { AboutDialogComponent } from '../about-dialog/about-dialog.component';
import { ExportDialogComponent } from '../export-dialog/export-dialog.component';
import { LoadingDialogComponent } from '../loading-dialog/loading-dialog.component';

import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { NotificationDialogComponent } from '../notification-dialog/notification-dialog.component';

@Component({
  selector: 'app-main',
  templateUrl: './main.component.html',
  styleUrls: ['./main.component.css']
})
export class MainComponent implements OnInit {
  title = 'ABSee - Artifact Bundle Viewer';

  count: number = 0;
  private ipcRenderer: IpcRenderer;
  // private _differ: KeyValueDiffer;

  artifactBundles: Map<string, ArtifactBundle> = new Map();
  lastOpenedBundle: string;

  loadingDialogRef: MatDialogRef<any>;
  notificationDialogRef: MatDialogRef<any>;

  constructor(public dialog: MatDialog,
              private zone: NgZone,
              private ref: ChangeDetectorRef /*, private _differs: KeyValueDiffers */) {
    if ((<any>window).require) {
      try {
        this.ipcRenderer = (<any>window).require("electron").ipcRenderer;
      } catch (error) {
        throw error;
      }
    } else {
      console.warn("Could not load electron ipc");
    }

    this.ipcRenderer.on('load-bundle', (event, artifactBundle: ArtifactBundle) => {
      this.zone.run(() => {
        this.closeLoadingDialog();
        console.log('load-bundle', artifactBundle);
        console.log('path', artifactBundle.path);
        this.lastOpenedBundle = artifactBundle.path;
        if (this.artifactBundles.has(artifactBundle.path)) {
          // AB already open
          console.log('AB already open');
          //return;
        }
        //this.ref.detach();

        this.artifactBundles.set(artifactBundle.path, artifactBundle);
        console.log(this.artifactBundles);
        this.artifactBundles = new Map(this.artifactBundles);
        this.count++;
        // this.ref.detectChanges();
        //this.artifactBundles = new Map(this.artifactBundles);
        //this.ref.detectChanges();
        //this.ref.reattach();
      });
    });

    this.ipcRenderer.on('load-bundle-start', (event, artifactBundleName: string) => {
      this.zone.run(() => {
        this.showLoadingDialog(artifactBundleName);
      });
    });

    this.ipcRenderer.on('show-notification', (event, data: Notification) => {
      this.zone.run(() => {
        this.showNotificationDialog(data);
      });
    });
  }

  openArtifactBundle($event) : boolean {
    this.ipcRenderer.send('show-open-artifact-bundle-dialog');
    return false;
  }

  closeArtifactBundle(path: string) {
    let bundle: ArtifactBundle = this.artifactBundles.get(path);
    if (bundle) {
      this.artifactBundles.delete(path);
      this.ipcRenderer.send('delete-temp-directory', bundle.tempDir);
    }
    else {
      console.log('ERROR: closeArtifactBundle: Artifact bundle with path ' + path + ' not open');
    }
  }

  showDiffOptionsDialog($event) : void {
    let dialogRef = this.dialog.open(DiffOptionsDialogComponent, {
      data: {
        artifactBundles: this.artifactBundles
      }
    });

    dialogRef.afterClosed().subscribe(diffOptions => {
      if (diffOptions) {
        console.log('Diff options', diffOptions);
        this.showDiffWindow(diffOptions);
      }
    });
  }

  private showDiffWindow(diffOptions: DiffOptions) : void {
    console.log('showDiffDialog');
    this.ipcRenderer.send('show-diff', diffOptions);
  }

  showAboutDialog($event) : void {
    this.dialog.open(AboutDialogComponent);
  }

  showExportDialog($event) : void {
    let dialogRef = this.dialog.open(ExportDialogComponent, {
      data: {
        artifactBundles: this.artifactBundles
      }
    });

    dialogRef.afterClosed().subscribe(exportOptions => {
      if (exportOptions) {
        console.log('Export options', exportOptions);
        exportOptions.artifactBundle = this.artifactBundles.get(exportOptions.path);
        this.ipcRenderer.send('export-bundle', exportOptions);
      }
    });
  }

  showLoadingDialog(artifactBundleName: string) : void {
    this.loadingDialogRef = this.dialog.open(LoadingDialogComponent, {
      data: { text: artifactBundleName }
    });
  }

  closeLoadingDialog() {
    this.loadingDialogRef.close();
  }

  showNotificationDialog(data: Notification) {
    console.log('showNotificationDialog', data);
    this.notificationDialogRef = this.dialog.open(NotificationDialogComponent, {
      data: data
    });
  }

  ngOnInit() {
  }

}
