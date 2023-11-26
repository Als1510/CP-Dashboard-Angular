import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouteReuseStrategy } from '@angular/router';

import { IonicModule, IonicRouteStrategy } from '@ionic/angular';

import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { LoaderComponent } from './pages/utils/loader/loader.component';
import { HttpinterceptorService } from './services/httpinterceptor.service';
import { LoaderService } from './services/loader.service';
import { ThemeService } from './services/theme.service';

@NgModule({
  declarations: [AppComponent, LoaderComponent],
  entryComponents: [],
  imports: [BrowserModule, IonicModule.forRoot(), AppRoutingModule, HttpClientModule],
  providers: [
    { provide: RouteReuseStrategy, useClass: IonicRouteStrategy },
    { provide: HTTP_INTERCEPTORS, useClass: HttpinterceptorService, multi: true },
    LoaderService,
    ThemeService
  ],
  bootstrap: [AppComponent],
})
export class AppModule { }
