import { Component, OnInit } from '@angular/core';
import { MenuService } from './shared/services/menu.service';
import { isBoolean } from 'util';
import { SharedService } from './shared/services/shared-service';
import { ApiService } from './api.service';
import { KartService } from './kart-service.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  title = 'medcube3';
  isLoggedIn: boolean = false;
  constructor(private menuService: MenuService, private sharedService: SharedService,
    private apiService: ApiService, private kartService: KartService) {

    this.sharedService.setCurrentUser(localStorage.getItem('currentUser'));
    if (isBoolean(localStorage.getItem('isLoggedIn'))) {
      this.menuService.setLoggedIn(true);
    }
    this.menuService.isLoggedIn.subscribe(
      value => {

        if (!!value && value) {
          this.isLoggedIn = true;
        } else {
          this.isLoggedIn = false;
        }

      }
    );

  }

  ngOnInit() {

    if ('true' === localStorage.getItem('isLoggedIn')) {
      this.menuService.setLoggedIn(true);
    } else {
      this.menuService.setLoggedIn(false);
    }
    const loggedInUser = localStorage.getItem('currentUser');
    if (!!loggedInUser) {
      this.getCartDetails(loggedInUser);
    }
  }

  setProductList(product: any) {
    alert(JSON.stringify(product));
  }

  getCartDetails(userName: string) {
    this.apiService.getCartList(userName).subscribe(
      result => {
        if (!!result) {
          this.kartService.setCartData(result);
        }
      },
      (err) => {

      }

    );
  }

}
