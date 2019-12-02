import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

const API: string = "http://orangevalleycaa.org/api/music";

@Injectable()
export class MusicProvider {

  private favoriteSongs: any = [];

  constructor(public http: HttpClient) {
    console.log('Hello MusicProvider Provider');
  }

  getMusic() {
    return this.http.get(API);

  }

  getOneSong() {
    let oneSongUrl = API + "/id/1";
    return this.http.get(oneSongUrl);
  }

  addToFavorites(song) {

    let isSongAdded = this.favoriteSongs.findIndex((favoriteSong) => {
      return song.id === favoriteSong.id;
    });

    if (isSongAdded === -1) {
      this.favoriteSongs.push(song);
    }

  }

  getFavoriteSongs(){
    return this.favoriteSongs;
  }


}
