import { Component, Input, OnInit } from '@angular/core';
import { Job } from '../job-item/interface/Job';
import { JobService } from 'src/app/services/job.service';
import { ActivatedRoute } from '@angular/router';
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
    maximumApplication: 0
  }

  formattedRequirements: string = ''
  formattedResponsibilities: string = ''

  constructor(private jobService: JobService, private AcRouter: ActivatedRoute, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {
    this.AcRouter.queryParams.subscribe((params: any) => this.jobId = params.jobId)
    this.jobService.getJobByID(this.jobId).subscribe(job => {
      this.job = job
      this.formattedRequirements = this.job.requirements.join('\n');
      this.formattedResponsibilities = this.job.responsibilities.join('\n');
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
    console.log(this.job)
    this.jobService.updateJob(this.job.jobId, this.job).subscribe(result => console.log(result))
    this.messageService.add({ key: 'tc', severity: 'success', summary: 'Updated', detail: 'Openings Updated Successfully' });

  }

}