import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ForgetpasswordPageRoutingModule } from './forgetpassword-routing.module';

import { ThemeToggleComponent } from '../../utils/theme-toggle/theme-toggle.component';
import { ForgetpasswordPage } from './forgetpassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ForgetpasswordPageRoutingModule
  ],
  declarations: [ForgetpasswordPage, ThemeToggleComponent]
})
export class ForgetpasswordPageModule { }
