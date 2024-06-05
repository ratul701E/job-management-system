import { Component, Input, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { Job } from './interface/Job';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.css']
})
export class JobItemComponent implements OnInit {

  @Input() jobId: number = 0
  @Input() isButtonVisible: boolean = true;

  job: Job = {
    jobId: 1,
    jobName: "null",
    location: "null",
    salary: 0,
    publishDate: "null",
    description: "null",
    requirements: ["null"],
    responsibilities: ["null"],
    maximumApplication: 50
  };

  constructor(private jobService: JobService, private AcRouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.AcRouter.queryParams.subscribe((params: any) => this.jobId = params.jobId)


    this.jobService.getAllApplicationByID(this.jobId).subscribe(job => {
      this.job = job
    })

  }

  goBack(): void {
    this.router.navigate(['/jobs'])
  }

  apply(jobId: number) {
    this.router.navigate(["/apply"], {queryParams: {'jobId' : jobId}})
  }

}
