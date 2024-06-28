import { Component, Input, OnInit } from '@angular/core';
import { JobService } from 'src/app/services/job.service';
import { Job } from './interface/Job';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-job-item',
  templateUrl: './job-item.component.html',
  styleUrls: ['./job-item.component.css'],
  providers: [MessageService, ConfirmationService]
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
    maximumApplication: 0,
    acceptingResponse: false,
    jobApplications: [],
    alreadyApplied: 0,
    isNegotiable: false,
    deadline: ''
  };

  constructor(private messageService: MessageService, private jobService: JobService, private AcRouter: ActivatedRoute, private router: Router) { }

  ngOnInit(): void {

    this.AcRouter.queryParams.subscribe((params: any) => this.jobId = params.jobId)


    this.jobService.getJobByID(this.jobId).subscribe(response => {
      this.job = response.data
    },
    error => {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Server Error', detail: "Internal Server Error"});
    })

  }

  goBack(): void {
    this.router.navigate(['/jobs'])
  }

  apply(jobId: number) {
    this.router.navigate(["/apply"], {queryParams: {'jobId' : jobId}})
  }

}
