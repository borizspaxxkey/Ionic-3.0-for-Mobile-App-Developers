import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MediaPlugin, MediaObject } from '@ionic-native/media';

@Component({
  selector: 'page-music-player',
  templateUrl: 'music-player.html',
})
export class MusicPlayerPage {

  private music = {};
  private songMedia: MediaObject = null;
  private isMusicPaused: boolean = false;

  constructor(private mediaPlugin: MediaPlugin, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.music = this.navParams.get("music");
  }

  ionViewWillLeave() {
    this.stopMusic();
  }

  stopMusic() {
    if (this.songMedia !== null) {
      this.songMedia.stop();
      this.songMedia.release();

      this.songMedia = null;
    }
  }

  playMusic() {

    if (this.songMedia === null) {
      this.songMedia = this.mediaPlugin.create(this.music["music_url"]);
      this.songMedia.play();
    }
    else {
      if (this.isMusicPaused === true) {
        this.songMedia.play();
        this.isMusicPaused = false;
      }
    }
  }

  pauseMusic() {
    if (this.songMedia !== null) {
      this.songMedia.pause();
      this.isMusicPaused = true;
    }
  }

}
