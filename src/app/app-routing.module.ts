import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { SignupComponent } from './signup/signup.component';

const routes: Routes = [];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule {
  routes=[{path: '',redirectTo: 'login', pathMatch: 'full'},
  {path: 'home', component:AppComponent},
  {path: 'login', component:LoginComponent},
{path: 'signup', component:SignupComponent}];
 }
