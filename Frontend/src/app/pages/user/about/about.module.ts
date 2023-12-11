import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutPageRoutingModule } from './about-routing.module';

import { MenubuttonComponent } from '../../utils/menubutton/menubutton.component';
import { SharedModule } from '../../utils/shared.module';
import { AboutPage } from './about.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutPageRoutingModule,
    SharedModule
  ],
  declarations: [AboutPage, MenubuttonComponent]
})
export class AboutPageModule { }
