import { Component, Input } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ConfirmationService, MessageService } from 'primeng/api';
import { JobService } from 'src/app/services/job.service';
import { Job } from '../job-item/interface/Job';

interface __location {
  name: string
}

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
    acceptingResponse: true,
    jobApplications: [],
    alreadyApplied: 0,
    isNegotiable: true
  }

  locations: string[] = []

  formattedRequirements: string = ''
  formattedResponsibilities: string = ''

  constructor(private router: Router, private jobService: JobService, private confirmationService: ConfirmationService, private messageService: MessageService) {
    this.locations = [
            'Dhaka',
            'Cumilla',
            'Chattogram',
            'Khulna'
    ]
  }

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

  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  handleAdd() {
    // Add validation
    if (!this.job.jobName.trim()) {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Validation Error', detail: 'Job Name is required' });
      return;
    }

    if (!this.job.location.trim()) {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Validation Error', detail: 'Location is required' });
      return;
    }

    if (!this.job.description.trim()) {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Validation Error', detail: 'Description is required' });
      return;
    }

    if (this.job.salary <= 0) {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Validation Error', detail: 'Salary must be greater than zero' });
      return;
    }

    if (this.job.maximumApplication <= 0) {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Validation Error', detail: 'Maximum Applications must be greater than zero' });
      return;
    }

    if (!this.formattedRequirements.trim()) {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Validation Error', detail: 'Requirements are required' });
      return;
    }

    if (!this.formattedResponsibilities.trim()) {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Validation Error', detail: 'Responsibilities are required' });
      return;
    }

    this.job.requirements = this.formattedRequirements.split('\n').map(req => req.trim()).filter(req => req);
    this.job.responsibilities = this.formattedResponsibilities.split('\n').map(res => res.trim()).filter(res => res);
    this.job.publishDate = this.formatDate(new Date());

    console.log(this.job);
    this.jobService.addJob(this.job.jobId, this.job).subscribe(result => {
      this.messageService.add({ key: 'tc', severity: 'success', summary: 'Updated', detail: 'Openings Updated Successfully' });
      this.router.navigate(["/openings"]);
    });
  }

  acceptingResponseChange() {
    console.log(this.job.acceptingResponse)
  }

  goBack() {
    this.router.navigate(["/openings"])
  }
}
