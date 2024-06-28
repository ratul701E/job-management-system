import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { ButtonModule } from 'primeng/button';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http'
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
import { ConfirmDialogModule } from 'primeng/confirmdialog';
import { InputSwitchModule } from 'primeng/inputswitch';
import { CheckboxModule } from 'primeng/checkbox';
import { StyleClassModule } from 'primeng/styleclass';
import { DropdownModule } from 'primeng/dropdown';
import { TagModule } from 'primeng/tag';
import { InputNumberModule } from 'primeng/inputnumber';
import { AutoCompleteModule } from 'primeng/autocomplete';



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
import { AdminNavComponent } from './components/admin-nav/admin-nav.component';
import { SingleApplicationComponent } from './components/single-application/single-application.component';
import { LoginComponent } from './components/login/login.component';
import { InputTextModule } from 'primeng/inputtext';
import { PasswordModule } from 'primeng/password';
import { RippleModule } from 'primeng/ripple';
import { AuthInterceptor } from './interceptors/auth.interceptor';
import { AuthService } from './services/auth.service';

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
    UpdateOpeningComponent,
    AdminNavComponent,
    SingleApplicationComponent,
    LoginComponent
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
    InputSwitchModule,
    CheckboxModule,
    StyleClassModule,
    InputTextModule,
    PasswordModule,
    RippleModule,
    DropdownModule,
    TagModule,
    InputNumberModule,
    AutoCompleteModule
  ],
  providers: [
    AuthService,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
