import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { JobComponent } from './components/job/job.component';
import { HomeComponent } from './components/home/home.component';
import { JobItemComponent } from './components/job-item/job-item.component';
import { ApplyComponent } from './components/apply/apply.component';
import { ViewOpeningComponent } from './components/view-opening/view-opening.component';
import { ViewApplicationsComponent } from './components/view-applications/view-applications.component';
import { UpdateOpeningComponent } from './components/update-opening/update-opening.component';
import { AddOpeningComponent } from './components/add-opening/add-opening.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "jobs", component: JobComponent },
  { path: "job", component: JobItemComponent },
  { path: "apply", component: ApplyComponent },
  { path: "openings", component: ViewOpeningComponent },
  { path: "applications", component: ViewApplicationsComponent },
  { path: "update-opening", component: UpdateOpeningComponent },
  { path: "add-opening", component: AddOpeningComponent },
  { path: "login", component: LoginComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
