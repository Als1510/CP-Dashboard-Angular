import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { LoginPageRoutingModule } from './login-routing.module';

import { ThemeToggleComponent } from '../../utils/theme-toggle/theme-toggle.component';
import { SocialComponent } from '../social/social.component';
import { LoginPage } from './login.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    LoginPageRoutingModule,
  ],
  declarations: [LoginPage, ThemeToggleComponent, SocialComponent],
  providers: []
})
export class LoginPageModule { }
