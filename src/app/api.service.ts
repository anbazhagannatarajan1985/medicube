import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import 'rxjs/add/operator/toPromise';

import 'rxjs/add/operator/map';
import 'rxjs/add/operator/timeout';
import { Observable } from 'rxjs/Observable';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  apiURL: string = 'http://localhost:8080';


  constructor(private httpClient: HttpClient) { }

  login(data: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.post(this.apiURL + '/login', data).map(res => res).timeout(30000);
  }

  signup(data: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.put(this.apiURL + '/users/sign-up', data).map(res => res).timeout(30000);
  }

  updateItem(data: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.put(this.apiURL + '/item', data).map(res => res).timeout(30000);
  }

  getAllItemList() {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.get(this.apiURL + '/item').map(res => res).timeout(30000);
  }

  getItemListByCategoryAndSubCategory(category: string, subCategory: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.get(this.apiURL + '/item/findbycandsc?c=' + category + '&sc=' + subCategory).map(res => res).timeout(30000);
  }

  addCart(cart: any) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.put(this.apiURL + '/cart', cart).map(res => res).timeout(30000);
  }

  getCartList(userName: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.get(this.apiURL + '/cart/user-cart?u=' + userName).map(res => res).timeout(30000);
  }

  deleteCartItem(id: string) {
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.delete(this.apiURL + '/cart?id=' + id).map(res => res).timeout(30000);
  }

  createOrder(username: any) {
    debugger
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.httpClient.put(this.apiURL + '/order', username).map(res => res).timeout(30000);
  }

}
