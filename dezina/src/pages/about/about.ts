import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { ProductProvider } from '../../providers/product/product';

@Component({
  selector: 'page-about',
  templateUrl: 'about.html'
})
export class AboutPage {

  private bestSellerProducts = [];

  constructor(public navCtrl: NavController, private productService: ProductProvider) {

  }

  ionViewDidLoad() {
    this.productService.getProducts()
      .subscribe((allProducts) => {
          this.bestSellerProducts = allProducts.filter((product) => product.bestSeller == true)
          console.log(this.bestSellerProducts);
      });
  }
}
