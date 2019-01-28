import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-cart',
  templateUrl: './cart.component.html',
  styleUrls: ['./cart.component.css']
})
export class CartComponent implements OnInit {

private productList: any[] = [];

  constructor() { 
    this.productList = this.getProductList();
  }

  ngOnInit() {
  }

    getProductList() {
      return [
        {id:1, name: 'product1', price: 100, qty: 1, total : 100},
        {id:2, name: 'product2', price: 150, qty: 1, total : 150},
        {id:3, name: 'product3', price: 120, qty: 1, total : 120},
        {id:4, name: 'product4', price: 120, qty: 1, total : 120},
    ];
  }

    decreaseQuantity(index: number){
      let product = this.productList[index];
      let qty = product['qty'];
      let price = product['price'];
      if (qty > 0) {
        qty = qty - 1;
        product['qty'] = qty;
        product['total'] = qty * price;
      }
    }

    increaseQuantity(index: number){
      let product = this.productList[index];
      let qty = product['qty'];
      let price = product['price'];
        qty = qty + 1;
        product['qty'] = qty;
        product['total'] = qty * price;
    }
}
