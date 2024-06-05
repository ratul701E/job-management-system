import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http'
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import {FileUploadModule} from 'primeng/fileupload';
import {DialogModule} from 'primeng/dialog';
import {MenubarModule} from 'primeng/menubar';
import {ToastModule} from 'primeng/toast';
import { ChipModule } from 'primeng/chip';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobComponent } from './components/job/job.component';
import { HomeComponent } from './components/home/home.component';
import { JobItemComponent } from './components/job-item/job-item.component';
import { ApplyComponent } from './components/apply/apply.component';
import { ApplyNavComponent } from './components/apply-nav/apply-nav.component';

@NgModule({
  declarations: [
    AppComponent,
    JobComponent,
    HomeComponent,
    JobItemComponent,
    ApplyComponent,
    ApplyNavComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ButtonModule,
    HttpClientModule,
    CardModule,
    FormsModule,
    CalendarModule,
    BrowserAnimationsModule,
    FileUploadModule,
    DialogModule,
    MenubarModule,
    ToastModule,
    ChipModule
    
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
