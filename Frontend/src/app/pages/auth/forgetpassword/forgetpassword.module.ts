import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';
import { ForgetpasswordPageRoutingModule } from './forgetpassword-routing.module';

import { SharedModule } from '../../utils/shared.module';
import { ForgetpasswordPage } from './forgetpassword.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    IonicModule,
    ForgetpasswordPageRoutingModule,
    SharedModule
  ],
  declarations: [ForgetpasswordPage]
})
export class ForgetpasswordPageModule { }
