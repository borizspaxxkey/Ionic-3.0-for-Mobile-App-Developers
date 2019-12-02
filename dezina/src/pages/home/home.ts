import { Component } from '@angular/core';
import { NavController, ModalController } from 'ionic-angular';
import { Http } from '@angular/http';
import "rxjs/add/operator/map";
import { ProductProvider } from '../../providers/product/product';
import { ProductDetailPage } from '../product-detail/product-detail';
import { FilterModalPage } from '../filter-modal/filter-modal';

@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  private allProducts = [];
  private maleSelected = true;
  private femaleSelected = true;

  constructor(private modalController: ModalController, private productService: ProductProvider, private http: Http, public navCtrl: NavController) {

  }

  ionViewDidLoad() {
    this.productService.getProducts()
      .subscribe((response) => {
        this.allProducts = response;
      });
  }

  goToProductDetailPage(product) {
    this.navCtrl.push(ProductDetailPage, {
      productDetails: product
    });
  }

  openFilterModal() {
    let filterStateFromMainPage = {
      femaleSelected: this.femaleSelected,
      maleSelected: this.maleSelected
    };

    let openFilterModal = this.modalController.create(FilterModalPage, filterStateFromMainPage);
    openFilterModal.onDidDismiss((filterState) => {
      this.femaleSelected = filterState.femaleSelected;
      this.maleSelected = filterState.maleSelected;

      this.productService.getProducts()
        .subscribe((allProducts) => {
          let products = allProducts;
          if (filterState.maleSelected && filterState.femaleSelected) {
            this.allProducts = products;
            return;
          }
          else if(!filterState.maleSelected && !filterState.femaleSelected) {
            this.allProducts = [];
            return;
          }
          else if (!filterState.maleSelected && filterState.femaleSelected) {
             this.allProducts = products.filter((product) => {
               return product.gender !== "male";
            });
          }
          else {
             this.allProducts = products.filter((product) => {
               return product.gender !== "female";
            });
          }
          console.log(this.allProducts);
        });
    });
    openFilterModal.present();

  }
}
