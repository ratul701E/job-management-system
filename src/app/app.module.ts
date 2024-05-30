import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http'
import {CardModule} from 'primeng/card';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobComponent } from './components/job/job.component';
import { HomeComponent } from './components/home/home.component';
import { JobItemComponent } from './components/job-item/job-item.component';

@NgModule({
  declarations: [
    AppComponent,
    JobComponent,
    HomeComponent,
    JobItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    HttpClientModule,
    CardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
