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

import { app, BrowserWindow, dialog, ipcMain, Menu } from 'electron';
import * as contextMenu from 'electron-context-menu';

import * as path from "path";
import * as fsExtra from "fs-extra";
import * as url from 'url';

import { ArtifactBundleReader } from './ArtifactBundleReader';
import { ArtifactBundleExporter } from './ArtifactBundleExporter';
import { ExportOptions } from '../common/ExportOptions';
import { Notification, NotificationType } from '../common/Notification';

// TODO: Add: https://stackoverflow.com/questions/46533095/angular-4-electron-how-to-run-application-and-watch-for-changes-live-reload
// require('electron-reload')(__dirname, {
//   // Note that the path to electron may vary according to the main file
//   electron: path.join(__dirname, '..', '..', 'node_modules', 'electron', 'dist', 'electron.exe')
// }); 
contextMenu();

export default class Main {
  static mainWindow: Electron.BrowserWindow;
  static diffWindow: Electron.BrowserWindow;
  static application: Electron.App;
  static BrowserWindow: any; //: BrowserWindow;
  static ipc: Electron.IpcMain = ipcMain;

  public static showOpenBundleDialog() {
    dialog.showOpenDialog({
      properties: ['openFile'],
      filters: [{ name: 'Artifact Bundle', extensions: ['zip'] }]
    },
      function (fileNames) {
        // fileNames is an array that contains all the selected
        console.log('Filenames: ', fileNames);
        if (fileNames === undefined) {
          console.log("No file selected");
        } else {
          //readFile(fileNames[0]);
          let bundleReader: ArtifactBundleReader = new ArtifactBundleReader(Main.mainWindow, fileNames[0]);
          bundleReader.open();
        }
      });
  }

  public static showExportBundleFilenameDialog(exportOptions: ExportOptions) {
    dialog.showSaveDialog({
      filters: [{ name: 'Artifact Bundle YAML File', extensions: ['yaml'] }]
    },
      function (filename) {
        // fileNames is an array that contains all the selected
        console.log('Filename: ', filename);
        if (filename === undefined) {
          console.log("No file selected");
        } else {
          exportOptions.filePath = filename;
          console.log('exportBundle', exportOptions);
          let notification: Notification = new Notification();
          notification.title = 'Export Artifact Bundle';
          let success = ArtifactBundleExporter.export(exportOptions);
          if (success) {
            notification.type = NotificationType.Message;
            notification.message = 'Artifact bundle export completed.';
          }
          else {
            notification.type = NotificationType.Error;
            notification.message = 'Artifact bundle could not be exported.';
          }
          Main.mainWindow.webContents.send('show-notification', notification);
        }
      });
  }

  public static deleteTempDirectory(tempDirectory: string) {
    if (tempDirectory.includes('abviewer-')) {
      console.log('Removing temp dir ' + tempDirectory);
      fsExtra.removeSync(tempDirectory);
    }
  }

  private static createWindow() {
    Main.mainWindow = new Main.BrowserWindow({
      width: 800,
      height: 600,
      icon: path.join(__dirname, '../abviewer/assets/images/ImageStreamerLogo.png')
    });
    Main.mainWindow.loadURL('file://' + path.join(__dirname, '../abviewer/index.html'));
    Main.mainWindow.on('closed', Main.onClose);
    if (!app.isPackaged) {
      Main.mainWindow.webContents.openDevTools();
    }

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);
  }

  private static createDiffWindow(options) {
    Main.diffWindow = new Main.BrowserWindow({
      width: 800,
      height: 600,
      icon: path.join(__dirname, '../abviewer/assets/images/ImageStreamerLogo.png') });
    Main.diffWindow.loadURL('file://' + path.join(__dirname, '../abviewer/index.html'));

    // https://coursetro.com/posts/code/120/Creating-and-Using-Windows-in-Electron
    // https://stackoverflow.com/questions/48308385/how-to-load-angular-2-routes-in-a-new-browserwindow-electron
    // hash requires RouterModule.forRoot(routes, {useHash: true})

    // Open /diff route in new window
    let diffUrl: string = url.format({
      pathname: path.join(__dirname, '../abviewer/index.html'),
      protocol: 'file:',
      slashes: true,
      hash: '/diff'
    });
    console.log('diff url', diffUrl);
    Main.diffWindow.loadURL(diffUrl);
    //ipcMain.emit('show-diff-content', options);

    if (!app.isPackaged) {
      Main.diffWindow.webContents.openDevTools();
    }

    Main.diffWindow.webContents.on('did-finish-load', () => {
      Main.diffWindow.webContents.send('show-diff-content', options);
    })
  }

  // private static exportBundle(exportOptions) {
  //   console.log('exportBundle', exportOptions);
  //   ArtifactBundleExporter.export(exportOptions);
  // }

  private static onActivate() {
    // On OS X it"s common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    if (Main.mainWindow === null) {
      Main.createWindow();
    }
  }

  private static onWindowAllClosed() {
    // On OS X it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') {
      Main.application.quit();
    }
  }

  private static onClose() {
    // Dereference the window object, usually you would store windows
    // in an array if your app supports multi windows, this is the time
    // when you should delete the corresponding element.
    Main.mainWindow = null;
    ArtifactBundleReader.closeAll();
  }

  private static onReady() {
    Main.createWindow();
  }

  static main(app: Electron.App, browserWindow: typeof BrowserWindow) {
    // we pass the Electron.App object and the
    // Electron.BrowserWindow into this function
    // so this class has no dependencies. This
    // makes the code easier to write tests for
    Main.BrowserWindow = browserWindow;
    Main.application = app;
    Main.application.on('activate', Main.onActivate);
    Main.application.on('window-all-closed', Main.onWindowAllClosed);
    Main.application.on('ready', Main.onReady);

    Main.ipc.on('show-open-artifact-bundle-dialog', (event, args) => {
      console.log('Received show open artifact bundle dialog event');
      Main.showOpenBundleDialog();
    });

    Main.ipc.on('delete-temp-directory', (event, tempDirectory) => {
      // TODO: Better design
      console.log('Received delete-temp-directory event for ' + tempDirectory);
      Main.deleteTempDirectory(tempDirectory);
    });

    Main.ipc.on('show-diff', (event, options) => {
      console.log('Received show-diff event with options', options);
      Main.createDiffWindow(options);
    });

    Main.ipc.on('export-bundle', (event, exportOptions) => {
      console.log('Received export-bundle event with options', exportOptions);
      Main.showExportBundleFilenameDialog(exportOptions);
    });
  }
}

let menuTemplate: Electron.MenuItemConstructorOptions[] = [
  {
    label: 'File',
    submenu: [
      {
        label: 'Open Artifact Bundle',
        click: () => {
          Main.showOpenBundleDialog();
        }
      }, {
        type: 'separator'
      }, {
        label: 'Exit',
        click: () => {
          app.quit();
        }
      }
    ]
  }
];

Main.main(app, BrowserWindow);