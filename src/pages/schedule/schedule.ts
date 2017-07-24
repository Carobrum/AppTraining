import { Component, ViewChild } from '@angular/core';

import { AlertController, App, FabContainer, ItemSliding, List, ModalController, NavController, ToastController, LoadingController, Refresher } from 'ionic-angular';

/*
  To learn how to use third party libs in an
  Ionic app check out our docs here: http://ionicframework.com/docs/v2/resources/third-party-libs/
*/
// import moment from 'moment';

import { ConferenceData } from '../../providers/conference-data';
import { UserData } from '../../providers/user-data';

import { SessionDetailPage } from '../session-detail/session-detail';
import { ScheduleFilterPage } from '../schedule-filter/schedule-filter';
import { UserInfoPage } from '../user-info/user-info';


declare var  jQuery:any;
declare var $:any;

@Component({
  selector: 'page-schedule',
  templateUrl: 'schedule.html'
})
export class SchedulePage {
  // the list is a child of the schedule page
  // @ViewChild('scheduleList') gets a reference to the list
  // with the variable #scheduleList, `read: List` tells it to return
  // the List and not a reference to the element
  @ViewChild('scheduleList', { read: List }) scheduleList: List;

  dayIndex = 0;
  queryText = '';
  segment = 'all';
  excludeTracks: any = [];
  shownSessions: any = [];
  groups: any = [];
  confDate: string;

  constructor(
    public alertCtrl: AlertController,
    public app: App,
    public loadingCtrl: LoadingController,
    public modalCtrl: ModalController,
    public navCtrl: NavController,
    public toastCtrl: ToastController,
    public confData: ConferenceData,
    public nav: NavController,
    public user: UserData,
    
  ) {
this.nav=nav;



  }


UserPage(){
 this.nav.push(UserInfoPage);
}

  ionViewDidLoad() {
    this.app.setTitle('Schedule');
    this.updateSchedule();
   this.toggle();

  }

  InfoCourse(){
    this.nav.push(SessionDetailPage);
  }

increment(){
  var percen=100;
  console.log($('#test-circle7').attr('percent'));
 //$('#test-circle7').empty().removeData().attr('data-percent', '[100]').circliful();
 //document.getElementById('#test-circle7').innerHTML = "";
 $('#test-circle7').empty();
 $("#test-circle7").circliful({ animationStep: 5, foregroundBorderWidth: 5, backgroundBorderWidth: 15, percent: 100 }); 
}

toggle(){
 $("#test-circle").circliful({
            animation: 1,
            animationStep: 5,
            foregroundBorderWidth: 15,
            backgroundBorderWidth: 15,
            percent: 38,
            textSize: 0,
            textStyle: 'font-size: 0px;',
            textColor: '#fff',
            multiPercentage: 1,
            percentages: [10, 20, 30]
        });

 $("#test-circle1v2").circliful({
            animation: 1,
            animationStep: 5,
            foregroundBorderWidth: 15,
            backgroundBorderWidth: 15,
            percent: 0,
            textSize: 0,
            textStyle: 'font-size: 0px;',
            textColor: '#fff',
            multiPercentage: 1,
            percentages: [0, 0, 0]
        });

 $("#test-circle1v3").circliful({
            animation: 1,
            animationStep: 5,
            foregroundBorderWidth: 15,
            backgroundBorderWidth: 15,
            percent: 0,
            textSize: 28,
            textStyle: 'font-size: 0px;',
            textColor: '#fff',
            multiPercentage: 1,
            percentages: [0, 0, 0]
        });

        $("#test-circle2").circliful({
            animation: 0,
            animationStep: 6,
            foregroundBorderWidth: 5,
            backgroundColor: "none",
           textColor: '#fff',
            percent: 50,
            iconColor: '#3498DB',
            icon: 'none',
            iconSize: '40',
            iconPosition: 'middle'
        });

        $("#test-circle3").circliful({
            animation: 1,
            animationStep: 6,
            foregroundBorderWidth: 5,
            backgroundBorderWidth: 1,
            percent: 88,
            iconColor: '#3498DB',
            icon: 'none',
            iconSize: 'o',
            iconPosition: 'middle'
        });

        $("#test-circle4").circliful({
            animation: 1,
            animationStep: 1,
            target: 10,
            start: 2,
            showPercent: 1,
            backgroundColor: '#000',
            foregroundColor: '#A8C64A',
            fontColor: '#000',
            iconColor: '#000',
            icon: 'none',
            iconSize: '0',
            iconPosition: 'middle',
            multiPercentage: 1,
            text: 'No Kids'
        });

        $("#test-circle5").circliful({
            animationStep: 5,
            foregroundBorderWidth: 5,
            backgroundBorderWidth: 15,
            percent: 80,            
            icon: 'none',
            iconPosition: 'middle',
            text: 'Superama Store',            
             textBelow: true
        });

        $("#test-circle6").circliful({
            animationStep: 5,
            foregroundBorderWidth: 5,
            backgroundBorderWidth: 15,
            percent: 80,            
            icon: 'none',
            iconPosition: 'middle',
            text: 'Walmart Store',            
            textBelow: true
        });

          $("#test-circle7").circliful({
            animationStep: 5,
            foregroundBorderWidth: 5,
            backgroundBorderWidth: 15,
            percent: 80,            
            icon: 'none',
            iconPosition: 'middle',
            text: 'Sams Store',            
            textBelow: true
        });




          $("#test-circle20").circliful({
            animationStep: 5,
            foregroundBorderWidth: 5,
            backgroundBorderWidth: 15,
            percent: 80,            
            icon: 'none',
            iconPosition: 'middle',
            text: 'Ethics',            
            textBelow: true
        });

          $("#test-circle21").circliful({
            animationStep: 5,
            foregroundBorderWidth: 5,
            backgroundBorderWidth: 15,
            percent: 0,            
            icon: 'none',
            iconPosition: 'middle',
            text: 'Culture',            
            textBelow: true
        });

          $("#test-circle22").circliful({
            animationStep: 5,
            foregroundBorderWidth: 5,
            backgroundBorderWidth: 15,
            percent: 0,            
            icon: 'none',
            iconPosition: 'middle',
            text: 'Induction',            
            textBelow: true

        });
}

  updateSchedule() {
    // Close any open sliding items when the schedule updates
    this.scheduleList && this.scheduleList.closeSlidingItems();

    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;
    });
  }

  presentFilter() {
    let modal = this.modalCtrl.create(ScheduleFilterPage, this.excludeTracks);
    modal.present();

    modal.onWillDismiss((data: any[]) => {
      if (data) {
        this.excludeTracks = data;
        this.updateSchedule();
      }
    });

  }

  goToSessionDetail(sessionData: any) {
    // go to the session detail page
    // and pass in the session data
    this.navCtrl.push(SessionDetailPage, {
      name: sessionData.name,
      session: sessionData
    });
  }

  addFavorite(slidingItem: ItemSliding, sessionData: any) {

    if (this.user.hasFavorite(sessionData.name)) {
      // woops, they already favorited it! What shall we do!?
      // prompt them to remove it
      this.removeFavorite(slidingItem, sessionData, 'Task already completed before');
    } else {
      // remember this session as a user favorite
      this.user.addFavorite(sessionData.name);

      // create an alert instance
      let alert = this.alertCtrl.create({
        title: 'Task Completed',
        buttons: [{
          text: 'OK',
          handler: () => {
            // close the sliding item
            slidingItem.close();
          }
        }]
      });
      // now present the alert on top of all other content
      alert.present();
    }

  }

  removeFavorite(slidingItem: ItemSliding, sessionData: any, title: string) {
    let alert = this.alertCtrl.create({
      title: title,
      message: 'Would you like to grade this experience?',
      buttons: [
        {
          text: 'Cancel',
          handler: () => {
            // they clicked the cancel button, do not remove the session
            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        },
        {
          text: 'Grade',
          handler: () => {
            // they want to remove this session from their favorites
            this.user.removeFavorite(sessionData.name);
            this.updateSchedule();

            // close the sliding item and hide the option buttons
            slidingItem.close();
          }
        }
      ]
    });
    // now present the alert on top of all other content
    alert.present();
  }

  openSocial(network: string, fab: FabContainer) {
    let loading = this.loadingCtrl.create({
      content: `Posting to ${network}`,
      duration: (Math.random() * 1000) + 500
    });
    loading.onWillDismiss(() => {
      fab.close();
    });
    loading.present();
  }

  doRefresh(refresher: Refresher) {
    this.confData.getTimeline(this.dayIndex, this.queryText, this.excludeTracks, this.segment).subscribe((data: any) => {
      this.shownSessions = data.shownSessions;
      this.groups = data.groups;

      // simulate a network request that would take longer
      // than just pulling from out local json file
      setTimeout(() => {
        refresher.complete();

        const toast = this.toastCtrl.create({
          message: 'Sessions have been updated.',
          duration: 3000
        });
        toast.present();
      }, 1000);
    });
  }



  
}

