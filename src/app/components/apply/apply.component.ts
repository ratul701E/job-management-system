import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MessageService } from 'primeng/api';
import { Application } from 'src/app/Interface/Application';
import { ApplicationService } from 'src/app/services/application.service';
import { JobService } from 'src/app/services/job.service';
import { Job } from '../job-item/interface/Job';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css'],
  providers: [MessageService]

})
export class ApplyComponent implements OnInit {

  @Input() jobId: number = 0;
  constructor(private jobService: JobService, private applicationService: ApplicationService, private AcRouter: ActivatedRoute, private router: Router, private messageService: MessageService) { }



  isMSC = false
  showJob = false
  skill: string = ''
  submitResult: boolean = false

  application: Application = {
    id: 0,
    isAiubian: false,
    isBscCompleted: false,
    isMscCompleted: false,
    name: '',
    phone: '',
    dob: this.formatDate(new Date()),
    email: '',
    aiubId: '',
    bscUniversity: '',
    bscDepartment: '',
    bscCGPA: 0,
    mscUniversity: '',
    mscDepartment: '',
    mscCGPA: 0,
    bscGraduationYear: new Date().getFullYear(),
    bscAdmissionYear: new Date().getFullYear(),
    mscGraduationYear: new Date().getFullYear(),
    mscAdmissionYear: new Date().getFullYear(),
    skills: [],
    applicationId: 0
  };

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
    acceptingResponse: false,
    jobApplications: []
  }


  uploadedFiles: any[] = [];



  ngOnInit(): void {
    this.AcRouter.queryParams.subscribe((params: any) => {
      this.jobId = params.jobId
      this.jobService.getJobByID(this.jobId).subscribe(job => {
        this.job = job
        this.application.applicationId = this.job.jobId
      })
    }
    )
  }

  addSkill() {
    if (!(this.skill.length > 1)) {
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Cannot Added', detail: 'A skill name cannot be empty' });
      return
    }
    this.application.skills.push(this.skill)
    this.skill = ''
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  showJobDetails() {
    this.showJob = !this.showJob
  }

  goBack() {
    this.router.navigate(["/jobs"])
  }

  toggleIsAiubian() {
    this.application.isAiubian = !this.application.isAiubian
    if (this.application.isAiubian) this.application.bscUniversity = "American International University Bangladesh"
    else this.application.bscUniversity = ""
  }

  toggleMsc() {
    this.isMSC = !this.isMSC
  }

  toggleIsBscCompleted() {
    this.application.isBscCompleted = !this.application.isBscCompleted
  }

  toggleIsMscCompleted() {
    this.application.isMscCompleted = !this.application.isMscCompleted
  }

  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  handleApply() {
    if (!this.application.name || !this.application.email || !this.application.phone || !this.application.dob) {
      console.log("");
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Filed Error', detail: 'Please fill in all required fields.' });
      return;
    }

    if (this.application.isAiubian && !this.application.aiubId) {
      console.log("");
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'AIUB ID Error', detail: 'Please provide your AIUB Student ID.' });
      return;
    }

    if (!this.application.bscUniversity || !this.application.bscDepartment || !this.application.bscCGPA || (!this.application.bscAdmissionYear && !this.application.bscGraduationYear)) {
      console.log("");
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'BSc Info Error', detail: 'Please provide all BSc information.' });
      return;
    }

    if (this.isMSC && (!this.application.mscUniversity || !this.application.mscDepartment || !this.application.mscCGPA || (!this.application.mscAdmissionYear && !this.application.mscGraduationYear))) {
      console.log("");
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'BSc Info Error', detail: 'Please provide all MSc information.' });
      return;
    }

    if (!this.isMSC) {
      this.application.mscUniversity = "";
      this.application.mscDepartment = "";
      this.application.mscCGPA = 0;
      this.application.mscAdmissionYear = 0;
      this.application.mscGraduationYear = 0;
    }

    if (!this.application.isAiubian) {
      this.application.aiubId = "";
    }

    if (!this.application.isBscCompleted) {
      this.application.bscGraduationYear = 0;
    }
    else this.application.bscAdmissionYear = 0

    if (!this.application.isMscCompleted) {
      this.application.mscGraduationYear = 0;
    }
    else this.application.mscAdmissionYear = 0

    this.application.dob = this.formatDate(new Date(this.application.dob))
    console.log(this.application)

    this.applicationService.postApplication(this.application).subscribe(err => this.submitResult = !err)
    //chk
    this.messageService.add({ key: 'tc', severity: 'success', summary: 'Congratulation', detail: 'Application is submitted successfully' });
  }

  clear() {
    this.application = {
      id: 0,
      isAiubian: false,
      isBscCompleted: false,
      isMscCompleted: false,
      name: '',
      phone: '',
      dob: this.formatDate(new Date()),
      email: '',
      aiubId: '',
      bscUniversity: '',
      bscDepartment: '',
      bscCGPA: 0,
      mscUniversity: '',
      mscDepartment: '',
      mscCGPA: 0,
      bscGraduationYear: new Date().getFullYear(),
      bscAdmissionYear: new Date().getFullYear(),
      mscGraduationYear: new Date().getFullYear(),
      mscAdmissionYear: new Date().getFullYear(),
      skills: [],
      applicationId: this.jobId
    }
    this.messageService.add({ key: 'tc', severity: 'info', summary: 'Fileds Cleared', detail: 'All data fileds are cleared' });
  }


}
