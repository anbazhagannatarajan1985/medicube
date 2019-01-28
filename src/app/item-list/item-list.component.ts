import { Component, OnInit, Output, EventEmitter} from '@angular/core';
import { KartService } from '../kart-service.service';

@Component({
  selector: 'app-item-list',
  templateUrl: './item-list.component.html',
  styleUrls: ['./item-list.component.css']
})
export class ItemListComponent implements OnInit {
    
  @Output() productEmitter: EventEmitter<any>= new EventEmitter();
    private items : any[] = [];

  constructor(private kartService: KartService) {
    this.items = this.getItemList();
   }

  ngOnInit() {
  }

  getItemList() {
    return [
      {id:1, name: 'product1', url: './assets/images/pic5.jpg'},
      {id:2, name: 'product2', url: './assets/images/pic5.jpg'},
      {id:3, name: 'product3', url: './assets/images/pic5.jpg'},
      {id:4, name: 'product4', url: './assets/images/pic5.jpg'},
      {id:5, name: 'product5', url: './assets/images/pic5.jpg'},
      {id:6, name: 'product6', url: './assets/images/pic5.jpg'},
      {id:7, name: 'product7', url: './assets/images/pic5.jpg'},
    ];
  }

  addToCart(product: any) {
    debugger
    this.kartService.setkartCount(1);
    //this.productEmitter.emit(product);
  }
}

