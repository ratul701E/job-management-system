import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { Job } from '../job-item/interface/Job';
import { NavigationExtras, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css'],
  providers: [MessageService, ConfirmationService]
})
export class JobComponent implements OnInit {

  jobs: Job[] = [];
  constructor(private messageService: MessageService, private jobService: JobService, private router: Router) { }

  ngOnInit(): void {
    this.jobService.getAllJobs().subscribe(response => {
      this.jobs = response.data.filter(job => {
        if(!job.acceptingResponse || job.alreadyApplied === job.maximumApplication) return false
        return job
      })
    },
    error => {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Server Error', detail: "Internal Server Error"});
    })

  }

  

  goToJob(jobId: number) {
    console.log(jobId)
    this.router.navigate([`/job`], {queryParams: {'jobId' : jobId}});
  }

  apply(jobId: number){
    this.router.navigate(["/apply"], {queryParams: {'jobId' : jobId}})
  }

  goBack() {
    this.router.navigate(["/"])
  }

}
