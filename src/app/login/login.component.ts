import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { ApiService } from '../api.service';
import { FormGroup, FormControl, Validators } from '@angular/forms';

import * as models from '../models';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  private isInvalidCredential = false;
  loginForm: FormGroup;

  constructor(private router: Router, private apiService: ApiService) { }

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
    debugger
    this.isInvalidCredential = false;
    const data: models.UserModel = {};
    data.email = this.loginForm.get('email').value;
    data.password = this.loginForm.get('password').value;
    this.apiService.login(data).subscribe(
      result => {
        this.router.navigate(['/home']);
      },
      (err) => {
        this.isInvalidCredential = true;
      }

    );

  }
}
