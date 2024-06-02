import { Component, Input, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { Job } from './interface/Job';
import { Router } from '@angular/router';

@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.css']
})
export class JobItemComponent implements OnInit {

  @Input() jobId: number = 0
  dataAvailable : boolean = false
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

  constructor(private jobService: JobService, private router: Router) { }

  ngOnInit(): void {
    console.log(this.router.getCurrentNavigation()?.extras)
    this.jobService.getAllApplicationByID(this.jobId).subscribe(job => {
      this.dataAvailable = true;
      this.job = job
    })
    
  }

  goBack(): void {
    this.router.navigate(['/jobs']);
  }

}
