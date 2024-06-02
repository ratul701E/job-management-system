import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { JobComponent } from './components/job/job.component';
import { HomeComponent } from './components/home/home.component';
import { JobItemComponent } from './components/job-item/job-item.component';

const routes: Routes = [
  { path: "", component: HomeComponent },
  { path: "jobs", component: JobComponent },
  { path: "job", component: JobItemComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
