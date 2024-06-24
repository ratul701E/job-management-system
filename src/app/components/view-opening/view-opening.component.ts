import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/Interface/Application';
import { ApplicationService } from 'src/app/services/application.service';
import { JobService } from 'src/app/services/job.service';
import { Job } from '../job-item/interface/Job';
import { Router } from '@angular/router';
import { MessageService } from 'primeng/api';


@Component({
  selector: 'app-view-opening',
  templateUrl: './view-opening.componentv2.html',
  styleUrls: ['./view-opening.component.css'],
  providers: [MessageService]

})
export class ViewOpeningComponent implements OnInit {

  jobs: Job[] = []
  job: Job = this.getEmptyJob()
  displayBasic: boolean = false
  check: boolean = true
  loading: boolean = true
  constructor( private messageService: MessageService, private jobService: JobService, private router: Router) { }


  ngOnInit(): void {
    this.jobService.getAllJobs().subscribe(jobs => {
      this.jobs = jobs
      //this.job = this.jobs[0]
      this.loading = false
    })
    
  }

  onSelect() {
    this.showDialog(true)
  }

  onUnselect() {
    this.showDialog(false)
  }

  showDialog(status: boolean){
    if(!status) this.job = this.getEmptyJob()
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

  deleteJob() {
    if(this.job == undefined) {
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Failed To Remove', detail: 'Unknown error occured' });
    }

    if(this.job.jobApplications.length > 0) {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Failed To Remove', detail: `The job have ${this.job.jobApplications.length} application(s)` });
    }

    //now delete the job

    this.showDialog(false)
  }


  private getEmptyJob(): Job{
     let emptyJob: Job = {
      jobId: 0,
      jobName: '',
      location: '',
      salary: 0,
      publishDate: '',
      description: '',
      requirements: [],
      responsibilities: [],
      maximumApplication: 0,
      acceptingResponse: false,
      jobApplications: []
    }
    return emptyJob
  }

}
