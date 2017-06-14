import { TabsPage } from './../tabs/tabs';
import { Component } from '@angular/core';
import { NgForm } from '@angular/forms';

import { NavController } from 'ionic-angular';

import { UserData } from '../../providers/user-data';

import { SignupPage } from '../signup/signup';

import { FacebookAuth, AuthLoginResult, User } from '@ionic/cloud-angular';


@Component({
  selector: 'page-user',
  templateUrl: 'login.html'
})
export class LoginPage {

  loginDetails: AuthLoginResult;

  login: { username?: string, password?: string } = {};
  submitted = false;

  constructor(public navCtrl: NavController, public userData: UserData, private facebook: FacebookAuth, private user: User) { }

  onLogin(form: NgForm) {
    this.submitted = true;

    if (form.valid) {
      this.userData.login(this.login.username);
      this.navCtrl.push(TabsPage);
    }
  }

  onSignup() {
    this.navCtrl.push(SignupPage);
  }

  async onLoginFB(): Promise<void> {
    try {

      const token = await this.facebook.getToken();
      if(token) {
        this.userData.login('FBUserTest');
        this.navCtrl.setRoot(TabsPage);
      }
      else {
        this.loginDetails = await this.facebook.login();
        if (this.loginDetails.token) {
          await this.facebook.storeToken(this.loginDetails.token);
          
          this.userData.login(this.user.social.facebook.data.full_name);
          this.navCtrl.setRoot(TabsPage);
        }
      }

      // this.loginDetails = await this.facebook.login();
      // console.log(this.loginDetails);
      // console.log(this.user.social.facebook);

      // await this.facebook.storeToken(this.loginDetails.token);
      // const token = await this.facebook.getToken();
      // console.log(token);
      
    }
    catch (e) {
      console.error(e);
    }
  }
}
