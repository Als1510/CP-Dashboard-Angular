import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { PlatformsPageRoutingModule } from './platforms-routing.module';

import { MenubuttonComponent } from '../../utils/menubutton/menubutton.component';
import { ThemeToggleComponent } from '../../utils/theme-toggle/theme-toggle.component';
import { PlatformsPage } from './platforms.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ReactiveFormsModule,
    PlatformsPageRoutingModule
  ],
  declarations: [PlatformsPage, MenubuttonComponent, ThemeToggleComponent],
})
export class PlatformsPageModule { }
