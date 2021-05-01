import { Component } from '@angular/core';
import { Platform, ToastController } from '@ionic/angular';
import { File } from "@ionic-native/file/ngx";

@Component({
  selector: 'app-tab3',
  templateUrl: 'tab3.page.html',
  styleUrls: ['tab3.page.scss']
})
export class Tab3Page {
  public listDir = [];
  private ROOT_DIR = this.file.externalRootDirectory;
  constructor(private platform:Platform, private file: File, public toastController: ToastController) {
    if(platform.is('capacitor')){
      console.log('cap')
      this.listDirectories(this.ROOT_DIR, '');
    }
  }

  async presentToast(message: string) {
    const toast = await this.toastController.create({
      message,
      duration: 2000
    });
    toast.present();
  }

  handleError(err){
    this.presentToast(err);
  }

  listDirectories(path: string, dirName: string){
    this.file.listDir(path, dirName)
    .then(entries => {
      console.log(entries);
      this.listDir = entries;
    })
    .catch(err => {
      console.log(err);
      this.handleError(err);
    });
  }

}
