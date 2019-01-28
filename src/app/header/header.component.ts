import { Component, OnInit } from '@angular/core';
import { KartService } from '../kart-service.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  kartCount: number = 0;
  constructor(private kartService: KartService) {
    kartService.countEmitter.subscribe(count => this.setCount(count));
   }

  ngOnInit() {
  }

  setCount(count: number) {
    debugger
    this.kartCount = count;
  }

}
