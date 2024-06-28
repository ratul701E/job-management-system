import { Component, Input, OnInit } from '@angular/core';
import { Job } from '../job-item/interface/Job';
import { JobService } from 'src/app/services/job.service';
import { ActivatedRoute, Router } from '@angular/router';
import {ConfirmationService} from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-update-opening',
  templateUrl: './update-opening.component.html',
  styleUrls: ['./update-opening.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class UpdateOpeningComponent implements OnInit {
  @Input() jobId: number = 0
  @Input() job: Job = {
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
    jobApplications: [],
    alreadyApplied: 0,
    isNegotiable: false,
    deadline: ''
  }

  formattedRequirements: string = ''
  formattedResponsibilities: string = ''
  locations: string[] = []
  constructor(private jobService: JobService, private router: Router, private AcRouter: ActivatedRoute, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.locations = [
      'Dhaka',
      'Cumilla',
      'Chattogram',
      'Khulna'
]
   }

  ngOnInit(): void {
    this.AcRouter.queryParams.subscribe((params: any) => this.jobId = params.jobId)
    this.jobService.getJobByID(this.jobId).subscribe(response => {
      this.job = response.data
      this.formattedRequirements = this.job.requirements.join('\n');
      this.formattedResponsibilities = this.job.responsibilities.join('\n');

      console.log(this.job)
    },
    error => {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Server Error', detail: "Internal Server Error"});
    })
  }

  updateJob() {
    this.confirmationService.confirm({
            message: 'Are you sure that you want to perform update action?',
            accept: () => {
                this.handleUpate()
            }
        });
  }

  handleUpate() {
    this.job.requirements = this.formattedRequirements.split('\n')
    this.job.responsibilities = this.formattedResponsibilities.split('\n')
    this.job.deadline = this.formatDate(new Date(this.job.deadline))
    console.log(this.job)
    this.jobService.updateJob(this.job.jobId, this.job).subscribe(response => {
      if(!response.isError) {
        this.messageService.add({ key: 'tc', severity: 'success', summary: 'Updated', detail: 'Openings Updated Successfully' });
      }
      else this.showListOfMessages(response.messages, 'Failed to Update', 'error') 
    },
    error => {
      console.log(error)
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Server Error', detail: "Internal Server Error"});
    })
    

  }

  goBack() {
    this.router.navigate(["/openings"])
  }

  showListOfMessages(errors: string[], summary: string, severity = 'error') {
    errors.forEach(msg => {
      this.messageService.add({ key: 'tc', severity , summary , detail: msg });
    })
  }


  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

}
