import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';
import { MusicProvider } from '../../providers/music/music';

@Component({
  selector: 'page-favorite',
  templateUrl: 'favorite.html',
})
export class FavoritePage {

  private favoriteSongs: any = [];

  constructor(private musicService: MusicProvider, public navCtrl: NavController, public navParams: NavParams) {
  }

  ionViewDidLoad() {
    this.favoriteSongs = this.musicService.getFavoriteSongs();
  }

}
