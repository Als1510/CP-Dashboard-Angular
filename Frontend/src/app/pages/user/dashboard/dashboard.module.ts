import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';

import { IonicModule } from '@ionic/angular';

import { DashboardPageRoutingModule } from './dashboard-routing.module';

import { MenubuttonComponent } from '../../utils/menubutton/menubutton.component';
import { ThemeToggleComponent } from '../../utils/theme-toggle/theme-toggle.component';
import { DashboardPage } from './dashboard.page';

@NgModule({
  imports: [
    CommonModule,
    FormsModule,
    IonicModule,
    DashboardPageRoutingModule
  ],
  declarations: [DashboardPage,
    MenubuttonComponent, ThemeToggleComponent
  ]
})
export class DashboardPageModule { }
