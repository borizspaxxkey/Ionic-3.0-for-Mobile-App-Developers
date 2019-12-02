import { Component } from '@angular/core';
import { NavController, LoadingController, ActionSheetController, ToastController } from 'ionic-angular';
import { MusicProvider } from '../../providers/music/music';
import { SocialSharing } from '@ionic-native/social-sharing';
import { MusicPlayerPage } from '../music-player/music-player';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private allMusic: any = [];

  constructor(private toastController: ToastController, private socialSharing: SocialSharing,
    private actionSheetController: ActionSheetController,
    private loadingController: LoadingController,
    private musicService: MusicProvider, public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    let allMusicLoadingController = this.loadingController.create({
      content: "Getting Your Music From Server"
    });

    allMusicLoadingController.present();

    this.musicService.getMusic()
      .subscribe((response) => {

        allMusicLoadingController.dismiss();
        this.allMusic = response;
      });
  }

  addOneSong(refresher) {
    this.musicService.getOneSong()
      .subscribe((response) => {
        //Adds the song to the front of the array
        //this.allMusic.unshift(response[0]) if the response was an array, gets the first value of the array
        this.allMusic.unshift(response)
        refresher.complete();
      });
  }

  shareSong(music) {
    let shareSongActionSheet = this.actionSheetController.create({
      title: "Share Song With Friends",
      buttons: [
        {
          text: "Share On Facebook",
          icon: "logo-facebook",
          handler: () => {
            this.socialSharing.shareViaFacebook(music.name, music.image, music.music_url);
          }
        },
        {
          text: "Share On Twitter",
          icon: "logo-twitter",
          handler: () => {
            this.socialSharing.shareViaTwitter(music.name, music.image, music.music_url);
          }
        },
        {
          text: "Share",
          icon: "share",
          handler: () => {
            this.socialSharing.share(music.name, "", music.image, music.music_url);
          }
        },
        {
          text: "Cancel",
          role: "destructive"
        }
      ]
    });

    shareSongActionSheet.present();
  }

  goToMusicPlayer(music) {
    this.navCtrl.push(MusicPlayerPage, {
      music: music
    });
  }

  addToFavorites(music) {
    let toastController = this.toastController.create({
      duration: 2000,
      message: "Added To Favorites"
    });
    this.musicService.addToFavorites(music);

    toastController.present();
  }

}
