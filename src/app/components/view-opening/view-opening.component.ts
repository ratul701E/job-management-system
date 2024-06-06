import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/Interface/Application';
import { ApplicationService } from 'src/app/services/application.service';
import { JobService } from 'src/app/services/job.service';
import { Job } from '../job-item/interface/Job';
import { Router } from '@angular/router';


@Component({
  selector: 'app-view-opening',
  templateUrl: './view-opening.component.html',
  styleUrls: ['./view-opening.component.css'],

})
export class ViewOpeningComponent implements OnInit {

  jobs: Job[] = []
  job: Job | undefined
  displayBasic: boolean = false
  check: boolean = true
  constructor(private jobService: JobService, private router: Router) { }

  ngOnInit(): void {
    this.jobService.getAllJobs().subscribe(jobs => {
      this.jobs = jobs
      this.job = this.jobs[0]
    })
  }

  onSelect() {
    this.showDialog(true)
  }

  onUnselect() {
    this.showDialog(false)
  }

  showDialog(status: boolean){
    this.displayBasic = status
  }

  viewApplications() {

    this.router.navigate(["/applications"], {queryParams: {'jobId' : this.job?.jobId}})
    this.showDialog(false)
  }

  updateJob() {
  
    this.router.navigate(["/update-opening"], {queryParams: {'jobId' : this.job?.jobId}})
    this.showDialog(false)
  }

}
