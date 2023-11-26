import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ContactUsPageRoutingModule } from './contact-us-routing.module';

import { MenubuttonComponent } from '../../utils/menubutton/menubutton.component';
import { ThemeToggleComponent } from '../../utils/theme-toggle/theme-toggle.component';
import { ContactUsPage } from './contact-us.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    ContactUsPageRoutingModule
  ],
  declarations: [ContactUsPage, MenubuttonComponent, ThemeToggleComponent]
})
export class ContactUsPageModule { }
