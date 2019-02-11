import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as models from '../models';
import { MenuService } from '../shared/services/menu.service';
import { KartService } from '../kart-service.service';
import { SharedService } from '../shared/services/shared-service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private isInvalidCredential = false;
  loginForm: FormGroup;

  constructor(private router: Router, private apiService: ApiService,
    private menuService: MenuService, private kartService: KartService,
    private sharedService: SharedService) { }

  ngOnInit() {
    this.addFormControl();
  }

  addFormControl() {
    this.loginForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required)
    });
  }

  login() {
    this.isInvalidCredential = false;
    const data: models.UserModel = {};
    data.userName = this.loginForm.get('email').value;
    data.password = this.loginForm.get('password').value;
    this.apiService.login(data).subscribe(
      result => {
        this.menuService.setLoggedIn(true);
        localStorage.setItem('isLoggedIn', 'true');
        localStorage.setItem('currentUser', data.userName);
        this.router.navigate(['/home']);
        this.sharedService.setCurrentUser(data.userName);
        this.getCartDetails(data.userName);
      },
      (err) => {
        this.isInvalidCredential = true;
      }

    );

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
