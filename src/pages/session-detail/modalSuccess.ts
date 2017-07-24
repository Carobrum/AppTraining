import { Component} from '@angular/core';
import { ViewController, NavParams,AlertController,ModalController,NavController } from 'ionic-angular';

import { SchedulePage } from '../schedule/schedule';
@Component({
    templateUrl: 'modalSuccess.html'
})
export class ModalSuccess {
 session: any;

    constructor(private viewCtrl: ViewController, private params: NavParams,public alertCtrl: AlertController,
    public modalCtrl: ModalController, public nav: NavController) {
    this.nav=nav;

  }

  cancelar() {
    this.viewCtrl.dismiss();
  }

onSubmit(){
   this.nav.push(SchedulePage);
}



}