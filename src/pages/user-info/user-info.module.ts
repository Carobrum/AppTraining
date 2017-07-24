import { NgModule } from '@angular/core';
import { IonicPageModule } from 'ionic-angular';
import { UserInfoPage } from './user-info';

@NgModule({
  declarations: [
    UserInfoPage,
  ],
  imports: [
    IonicPageModule.forChild(UserInfoPage),
  ],
  exports: [
    UserInfoPage
  ]
})
export class UserInfoPageModule {}
