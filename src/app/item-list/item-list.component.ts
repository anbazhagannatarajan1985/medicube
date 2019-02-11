import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { KartService } from '../kart-service.service';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params, Router } from '@angular/router';
import { ApiService } from '../api.service';
import { ItemConfig } from '../shared/configs/item.config';
import * as models from '../models';
import { SharedService } from '../shared/services/shared-service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {

  @Output() productEmitter: EventEmitter<any> = new EventEmitter();
  userSubscription: Subscription;

  public items: any;
  public cartList: models.CartModel[] = [];

  constructor(private kartService: KartService, private _Activatedroute: ActivatedRoute,
    private apiService: ApiService, private sharedService: SharedService) {
    this.getItemList();
  }

  ngOnInit() {

    this.userSubscription = this._Activatedroute.params.subscribe(
      (params: Params) => {
        if (!!params) {
          const category = params['category'];
          const subCategory = params['subCategory'];
          if (!!category || !!subCategory) {
            this.getItemListByCategoryAndSubCategory(category, subCategory);
          } else {
            this.getItemList();
          }
        }

      });
  }

  getItemList() {
    this.apiService.getAllItemList().subscribe(
      result => {
        this.items = result;
        this.updateImageUrl();
      },
      (err) => {

      }

    );
  }

  getItemListByCategoryAndSubCategory(category: string, subCategory: string) {
    this.apiService.getItemListByCategoryAndSubCategory(category, subCategory).subscribe(
      result => {
        this.items = result;
        this.updateImageUrl();
      },
      (err) => {

      }

    );
  }

  addToCart(product: any) {
    let cartData: models.CartModel = {};
    cartData.userName = this.sharedService.getCurrentUser();
    cartData.productName = product.productName;
    cartData.price = product.price;
    cartData.category = product.category;
    cartData.subCategory = product.subCategory;
    cartData.description = product.description;
    cartData.expDate = product.expDate;
    cartData.quantity = 1;

    let cartList = this.kartService.getCartList();
    if (!!cartList && cartList.length > 0) {
      let carts = cartList.filter(item => product.productName === item.productName);
      if (!!carts && carts.length > 0) {
        let cart = carts[0];
        cartData.quantity = cart.quantity + 1;
        cartData.id = cart.id;
      }
    }

    this.apiService.addCart(cartData).subscribe(
      result => {
        if (!!cartData.id) {
          this.kartService.updateCartList(cartData);
        } else {
          this.kartService.addCartData(result);
        }
      },
      (err) => {

      }

    );


  }

  updateImageUrl() {

    let index = 0;
    for (let item of this.items) {
      this.items[index].url = ItemConfig.getImageUrl(item.subCategory);
      index++;
    }
  }
}

