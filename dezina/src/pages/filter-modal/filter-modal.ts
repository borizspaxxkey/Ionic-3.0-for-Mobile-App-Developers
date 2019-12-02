import { Component } from '@angular/core';
import { IonicPage, NavController, NavParams, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-filter-modal',
  templateUrl: 'filter-modal.html',
})
export class FilterModalPage {

  private femaleSelected = true;
  private maleSelected = true;

  constructor(private viewController: ViewController, public navCtrl: NavController, public navParams: NavParams) {
    this.femaleSelected = this.navParams.get("femaleSelected");
    this.maleSelected = this.navParams.get("maleSelected");
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad FilterModalPage');
  }

  closeModal() {
    let filterState = {
      femaleSelected: this.femaleSelected,
      maleSelected: this.maleSelected
    };
    this.viewController.dismiss(filterState);
    //this.navCtrl.pop();
  }
}
