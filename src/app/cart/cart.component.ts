import { Component, OnInit } from '@angular/core';
import { KartService } from '../kart-service.service';
import { ApiService } from '../api.service';
import { SharedService } from '../shared/services/shared-service';
import { Router } from '@angular/router';

export interface SummaryModel {
  totalItem?: number;
  totalQuantity?: number;
  totalAmount?: number;
  totalTax?: number;
  toBePaid?: number;
}
@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

  private productList: any[] = [];
  public cartList: any;
  public cartSummary: SummaryModel = {};

  constructor(private kartService: KartService, private apiService: ApiService,
    private sharedService: SharedService, private router: Router) {
    debugger
    this.productList = this.getProductList();
    const userName = localStorage.getItem('currentUser');
    this.cartList = this.getCartDetails(userName);
    this.calculateSummary();
  }

  ngOnInit() {
  }

  getProductList() {
    return [
      { id: 1, name: 'product1', price: 100, qty: 1, total: 100 },
      { id: 2, name: 'product2', price: 150, qty: 1, total: 150 },
      { id: 3, name: 'product3', price: 120, qty: 1, total: 120 },
      { id: 4, name: 'product4', price: 120, qty: 1, total: 120 },
    ];
  }

  decreaseQuantity(index: number) {
    debugger
    const cart = this.cartList[index];
    let qty = cart['quantity'];
    const price = cart['price'];
    if (qty > 0) {
      qty = qty - 1;
      cart['quantity'] = qty;
      this.cartList[index]['quantity'] = qty;
      this.calculateSummary();
      // cart['total'] = qty * price;
    }
  }

  increaseQuantity(index: number) {
    debugger
    const cart = this.cartList[index];
    let qty = cart['quantity'];
    const price = cart['price'];
    qty = qty + 1;
    cart['quantity'] = qty;
    this.cartList[index]['quantity'] = qty;
    this.calculateSummary();
    // cart['price'] = qty * price;
  }

  removeCart(index: number) {
    const cart = this.cartList[index];
    this.apiService.deleteCartItem(cart.id).subscribe(
      result => {
        if (!!result && result) {
          this.cartList.splice(index, 1);
          this.kartService.setCartData(this.cartList);
          this.calculateSummary();
        }
      },
      (err) => {

      }

    );


  }

  calculateSummary() {
    debugger
    let totalAmount = 0;
    let totalQuantity = 0;
    if (!!this.cartList && this.cartList.length > 0) {
      this.cartSummary.totalItem = this.cartList.length;
      for (const cartItem of this.cartList) {
        totalQuantity = totalQuantity + cartItem.quantity;
        const amount = cartItem.quantity * cartItem.price;
        totalAmount = totalAmount + amount;
      }
      debugger

      this.cartSummary.totalQuantity = totalQuantity;
      this.cartSummary.totalAmount = Number(Number(totalAmount).toFixed(2));
      this.cartSummary.totalTax = Number(Number(0.24 * this.cartSummary.totalAmount).toFixed(2));
      this.cartSummary.toBePaid = Number(Number(this.cartSummary.totalAmount + this.cartSummary.totalTax).toFixed(2));
    } else {
      this.cartSummary.totalItem = 0;
      this.cartSummary.totalQuantity = 0;
      this.cartSummary.totalAmount = 0;
      this.cartSummary.totalTax = 0;
      this.cartSummary.toBePaid = 0;
    }
  }

  getCartDetails(userName: string) {
    this.apiService.getCartList(userName).subscribe(
      result => {
        if (!!result) {
          this.cartList = result;
          this.calculateSummary();
          this.kartService.setCartData(result);
        }
      },
      (err) => {

      }

    );
  }

  placeOrder() {
    debugger
    const userName = localStorage.getItem('currentUser');
    this.apiService.createOrder(userName).subscribe(
      result => {
        if (!!result) {
          this.kartService.setkartCount(0);
          this.router.navigate(['/order-confirmation', result['orderId']]);
        }
      },
      (err) => {

      }

    );
  }

}
