import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { AboutPageRoutingModule } from './about-routing.module';

import { MenubuttonComponent } from '../../utils/menubutton/menubutton.component';
import { ThemeToggleComponent } from '../../utils/theme-toggle/theme-toggle.component';
import { AboutPage } from './about.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    AboutPageRoutingModule
  ],
  declarations: [AboutPage, MenubuttonComponent, ThemeToggleComponent]
})
export class AboutPageModule { }
