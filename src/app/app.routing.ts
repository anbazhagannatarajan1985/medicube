import { Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { SignupComponent } from './signup/signup.component';
import { LoginComponent } from './login/login.component';
import { HomeComponent } from './home/home.component';
import { CartComponent } from './cart/cart.component';
import { ItemListComponent } from './item-list/item-list.component';

export const AppRoutes: Routes = [
    {path: '',redirectTo: 'login', pathMatch: 'full'},
    {path: 'home', component:HomeComponent},
    {path: 'login', component:LoginComponent},
    {path: 'signup', component:SignupComponent},
    {path: 'cart', component:CartComponent},
    {path: 'item-list', component:ItemListComponent},
]