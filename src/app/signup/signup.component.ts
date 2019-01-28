import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';
import { ApiService } from '../api.service';

import * as models from '../models';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.css']
})
export class SignupComponent implements OnInit {

  signupForm: FormGroup;
  failedToCreateUser: boolean = false;
  userCreated: boolean = false;

  constructor(private apiService: ApiService) { }

  ngOnInit() {
    this.addFormControl();
  }

  addFormControl() {
    this.signupForm = new FormGroup({
      email: new FormControl('', Validators.required),
      password: new FormControl('', Validators.required),
      firstName: new FormControl('', Validators.required),
      lastName: new FormControl('', Validators.required),
      phone: new FormControl('', Validators.required)
    });
  }

  signup() {
    debugger
    this.failedToCreateUser = false;
    this.userCreated = false;
    const data: models.UserModel = {};
    data.email = this.signupForm.get('email').value;
    data.password = this.signupForm.get('password').value;
    data.firstName = this.signupForm.get('firstName').value;
    data.lastName = this.signupForm.get('lastName').value;
    data.phone = this.signupForm.get('phone').value;

    this.apiService.signup(data).subscribe(
      result => {
        this.userCreated = true;
      },
      (err) => {
        this.failedToCreateUser = true;
      }

    );
  }

}
