import { Component } from '@angular/core';

import { NavParams,ModalController, NavController, ViewController } from 'ionic-angular';
import {pruebaModal} from './modalPrueba';

@Component({
  selector: 'page-session-detail',
  templateUrl: 'session-detail.html'
})
export class SessionDetailPage {
   session: any;


  constructor(public navParams: NavParams ,public modalCtrl: ModalController,public viewCtrl: ViewController) {
    this.session = navParams.data.session;
  }

 openFilters() {
        console.log('hola bien');

  let modal=this.modalCtrl.create(pruebaModal)
   
      modal.onDidDismiss( session => {

            if ( session!= null && session!= undefined ){


            }          
        });

        modal.present();   

 }



}

