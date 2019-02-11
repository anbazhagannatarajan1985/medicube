import { Component, OnInit } from '@angular/core';
import { KartService } from '../kart-service.service';
import { MenuService } from '../shared/services/menu.service';
import { ItemConfig } from 'src/app/shared/configs/item.config';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.css']
})
export class HeaderComponent implements OnInit {

  public subCategories: any[];
  public categories: any[];

  kartCount: number = 0;
  isLoggedIn: boolean = false;
  constructor(private kartService: KartService, private menuService: MenuService) {
    this.categories = ItemConfig.getCategories();
    this.subCategories = ItemConfig.getSubCategories();

    kartService.countEmitter.subscribe(count => this.setCount(count));
    this.menuService.isLoggedIn.subscribe(
      value => {

        this.isLoggedIn = true;
      }
    );
  }

  ngOnInit() {
    this.menuService.isLoggedIn.subscribe(
      value => {

        this.isLoggedIn = true;
      }
    );
  }

  setCount(count: number) {

    this.kartCount = count;
  }

  logout() {
    this.menuService.setLoggedIn(false);
  }

}
