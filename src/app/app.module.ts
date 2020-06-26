import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { LogginInterceptorService } from './loggin-interceptor.service';
import { CacheInterceptorService } from './cache-interceptor.service';
import { CacheService } from './cache.service';


@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule
  ],
  providers: [
    CacheService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LogginInterceptorService,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: CacheInterceptorService,
      multi: true 
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
