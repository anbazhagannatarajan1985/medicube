import { Injectable, Output, EventEmitter } from '@angular/core';
import * as models from './models';

@Injectable({
  providedIn: 'root'
})
export class KartService {

  kartCount = 0;
  cartList: any = [];

  @Output() countEmitter: EventEmitter<any> = new EventEmitter();

  constructor() { }

  setkartCount(count: number) {

    this.kartCount = count;
    this.countEmitter.emit(this.kartCount);
  }

  getKartCount() {

    return this.kartCount;
  }

  addCartData(cart: models.CartModel) {
    this.cartList.push(cart);
    this.countEmitter.emit(this.cartList.length);
  }

  updateCartList(cart) {
    const itemIndex = this.cartList.findIndex(item => cart.id === item.id);
    this.cartList.splice(itemIndex, 1, cart);
  }

  setCartData(carts: any) {

    this.cartList = carts;
    if (!!this.cartList && this.cartList.length > 0) {
      this.setkartCount(this.cartList.length);
    } else {
      this.setkartCount(0);
    }
  }

  getCartList() {
    return this.cartList;
  }
}
