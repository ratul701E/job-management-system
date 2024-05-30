import { Component, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { Job } from '../job-item/interface/job';

@Component({
  selector: 'app-job',
  templateUrl: './job.component.html',
  styleUrls: ['./job.component.css']
})
export class JobComponent implements OnInit {

  jobs: Job[] = [];
  constructor(private jobService: JobService) { }

  ngOnInit(): void {
    this.jobService.getAllJobs().subscribe(jobs => this.jobs = jobs)
  }

}
