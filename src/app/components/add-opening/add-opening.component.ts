import { Component, Input } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { JobService } from 'src/app/services/job.service';
import { Job } from '../job-item/interface/Job';

@Component({
  selector: 'app-add-opening',
  templateUrl: './add-opening.component.html',
  styleUrls: ['./add-opening.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AddOpeningComponent {
  job: Job = {
    jobId: 0,
    jobName: '',
    location: '',
    salary: 0,
    publishDate: '',
    description: '',
    requirements: [],
    responsibilities: [],
    maximumApplication: 0,
    acceptingResponse: true
  }

  formattedRequirements: string = ''
  formattedResponsibilities: string = ''

  constructor(private jobService: JobService, private confirmationService: ConfirmationService, private messageService: MessageService) { }

  ngOnInit(): void {

  }

  addJob() {
    console.log("trying to add")
    this.confirmationService.confirm({
      message: 'Are you sure?',
      accept: () => {
        this.handleAdd()
      }
    });
  }

  handleAdd() {
    this.job.requirements = this.formattedRequirements.split('\n')
    this.job.responsibilities = this.formattedResponsibilities.split('\n')
    console.log(this.job)
    this.jobService.addJob(this.job.jobId, this.job).subscribe(result => { })
    this.messageService.add({ key: 'tc', severity: 'success', summary: 'Updated', detail: 'Openings Updated Successfully' });

  }

  acceptingResponseChange(){
    console.log(this.job.acceptingResponse)
  }
}
