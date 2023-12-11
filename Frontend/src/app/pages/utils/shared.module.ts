import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { LoaderComponent } from './loader/loader.component';
import { ThemeToggleComponent } from './theme-toggle/theme-toggle.component';

@NgModule({
  declarations: [
    ThemeToggleComponent,
    LoaderComponent
  ],
  imports: [
    CommonModule
  ],
  exports: [
    ThemeToggleComponent,
    LoaderComponent
  ]
})
export class SharedModule { }
