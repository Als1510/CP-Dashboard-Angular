import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { ResourcesPageRoutingModule } from './resources-routing.module';

import { MenubuttonComponent } from '../../utils/menubutton/menubutton.component';
import { ThemeToggleComponent } from '../../utils/theme-toggle/theme-toggle.component';
import { ResourcesPage } from './resources.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    ResourcesPageRoutingModule
  ],
  declarations: [ResourcesPage, MenubuttonComponent, ThemeToggleComponent]
})
export class ResourcesPageModule { }
