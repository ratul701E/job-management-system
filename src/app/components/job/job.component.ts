import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { Job } from '../job-item/interface/Job';
import { NavigationExtras, Router } from '@angular/router';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  jobs: Job[] = [];
  constructor(private jobService: JobService, private router: Router) { }

  ngOnInit(): void {
    this.jobService.getAllJobs().subscribe(jobs => {
      this.jobs = jobs
    })

  }

  

  goToJob(jobId: number) {
    console.log(jobId)
    this.router.navigate([`/job`], {queryParams: {'jobId' : jobId}});
  }

  apply(jobId: number){
    this.router.navigate(["/apply"], {queryParams: {'jobId' : jobId}})
  }

}
