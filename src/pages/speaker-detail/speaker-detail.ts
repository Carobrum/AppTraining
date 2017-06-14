import { Component } from '@angular/core';

import {ModalController, NavParams, ViewController,NavController } from 'ionic-angular';

import { SessionDetailPage } from '../session-detail/session-detail';

@Component({
  selector: 'page-speaker-detail',
  templateUrl: 'speaker-detail.html'
})
export class SpeakerDetailPage {
  speaker: any;

  constructor(public navCtrl: NavController, public navParams: NavParams,public modalCtrl: ModalController,public viewCtrl: ViewController) {
    this.speaker = this.navParams.data.speaker;

  }



showLogin() {
let modal = this.modalCtrl.create("Hola");
// this.navCtrl.push(modal);
modal.present();
}

dismiss(data) {
    this.viewCtrl.dismiss(data);
  }



  goToSessionDetail(session: any) {
    this.navCtrl.push(SessionDetailPage, { 
      name: session.name,
      session: session
    });
  }
}
