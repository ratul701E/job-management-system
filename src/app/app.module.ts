import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { HttpClientModule } from '@angular/common/http'
import { CardModule } from 'primeng/card';
import { FormsModule } from '@angular/forms';
import { CalendarModule } from 'primeng/calendar';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations'
import { FileUploadModule } from 'primeng/fileupload';
import { DialogModule } from 'primeng/dialog';
import { MenubarModule } from 'primeng/menubar';
import { ToastModule } from 'primeng/toast';
import { ChipModule } from 'primeng/chip';
import { TableModule } from 'primeng/table';
import {ConfirmDialogModule} from 'primeng/confirmdialog';


import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { JobComponent } from './components/job/job.component';
import { HomeComponent } from './components/home/home.component';
import { JobItemComponent } from './components/job-item/job-item.component';
import { ApplyComponent } from './components/apply/apply.component';
import { ApplyNavComponent } from './components/apply-nav/apply-nav.component';
import { ViewOpeningComponent } from './components/view-opening/view-opening.component';
import { ViewApplicationsComponent } from './components/view-applications/view-applications.component';
import { AddOpeningComponent } from './components/add-opening/add-opening.component';
import { UpdateOpeningComponent } from './components/update-opening/update-opening.component';

@NgModule({
  declarations: [
    AppComponent,
    JobComponent,
    HomeComponent,
    JobItemComponent,
    ApplyComponent,
    ApplyNavComponent,
    ViewOpeningComponent,
    ViewApplicationsComponent,
    AddOpeningComponent,
    UpdateOpeningComponent
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
    ChipModule,
    TableModule,
    ConfirmDialogModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
