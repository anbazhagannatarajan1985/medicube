import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'medcube3';

  setProductList(product: any) {
    alert(JSON.stringify(product));
  }
}
