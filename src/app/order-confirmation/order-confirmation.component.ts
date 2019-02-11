import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs';
import { ActivatedRoute, Params } from '@angular/router';

@Component({
  selector: 'app-order-confirmation',
  templateUrl: './order-confirmation.component.html',
  styleUrls: ['./order-confirmation.component.css']
})
export class OrderConfirmationComponent implements OnInit {

  userSubscription: Subscription;
  public orderId: string = '';

  constructor(private _Activatedroute: ActivatedRoute) { }

  ngOnInit() {
    this.userSubscription = this._Activatedroute.params.subscribe(
      (params: Params) => {
        this.orderId = params['orderId'];

      });
  }

}
