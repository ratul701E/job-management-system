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
  constructor(
    private jobService: JobService,
    private applicationService: ApplicationService,
    private AcRouter: ActivatedRoute,
    private router: Router,
    private messageService: MessageService
  ) {}

  isMSC = false;
  showJob = false;
  skill: string = '';
  submitResult: boolean = false;

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
    jobApplications: [],
    alreadyApplied: 0,
    isNegotiable: false,
    deadline: ''
  };

  uploadedFiles: any = {
    cv: null,
    coverLetter: null
  };

  ngOnInit(): void {
    this.AcRouter.queryParams.subscribe((params: any) => {
      this.jobId = params.jobId;
      this.jobService.getJobByID(this.jobId).subscribe((job) => {
        if (job.alreadyApplied === job.maximumApplication) this.dismiss();
        this.job = job;
        this.application.applicationId = this.job.jobId;
      });
    });
  }

  uploadCv(event: any){
    //console.log("hi")
    this.uploadedFiles.cv = event.files[0]
  }
  uploadCoverLetter(event: any){
    //console.log("hi")
    this.uploadedFiles.coverLetter = event.files[0]
  }

  dismiss() {
    this.router.navigate(['/jobs']);
  }

  addSkill() {
    if (!(this.skill.length > 1)) {
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Cannot Added', detail: 'A skill name cannot be empty' });
      return;
    }
    this.application.skills.push(this.skill);
    this.skill = '';
  }

  onFileSelect(event: any, fileType: string) {
    if (event.target.files.length > 0) {
      this.uploadedFiles[fileType] = event.target.files[0];
    }
  }

  showJobDetails() {
    this.showJob = !this.showJob;
  }

  goBack() {
    this.router.navigate(["/jobs"]);
  }

  toggleIsAiubian() {
    this.application.isAiubian = !this.application.isAiubian;
    if (this.application.isAiubian) {
      this.application.bscUniversity = "American International University Bangladesh";
    } else {
      this.application.bscUniversity = "";
    }
  }

  toggleMsc() {
    this.isMSC = !this.isMSC;
  }

  toggleIsBscCompleted() {
    this.application.isBscCompleted = !this.application.isBscCompleted;
  }

  toggleIsMscCompleted() {
    this.application.isMscCompleted = !this.application.isMscCompleted;
  }

  formatDate(date: Date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    return `${year}-${month}-${day}`;
  }

  handleApply() {
    // if (!this.application.name || !this.application.email || !this.application.phone || !this.application.dob) {
    //   this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Filed Error', detail: 'Please fill in all required fields.' });
    //   return;
    // }

    // if (this.application.isAiubian && !this.application.aiubId) {
    //   this.messageService.add({ key: 'tc', severity: 'warn', summary: 'AIUB ID Error', detail: 'Please provide your AIUB Student ID.' });
    //   return;
    // }

    // if (!this.application.bscUniversity || !this.application.bscDepartment || !this.application.bscCGPA || (!this.application.bscAdmissionYear && !this.application.bscGraduationYear)) {
    //   this.messageService.add({ key: 'tc', severity: 'warn', summary: 'BSc Info Error', detail: 'Please provide all BSc information.' });
    //   return;
    // }

    // if (this.isMSC && (!this.application.mscUniversity || !this.application.mscDepartment || !this.application.mscCGPA || (!this.application.mscAdmissionYear && !this.application.mscGraduationYear))) {
    //   this.messageService.add({ key: 'tc', severity: 'warn', summary: 'BSc Info Error', detail: 'Please provide all MSc information.' });
    //   return;
    // }

    if (!this.isMSC) {
      this.application.mscUniversity = "-";
      this.application.mscDepartment = "-";
      this.application.mscCGPA = 0;
      this.application.mscAdmissionYear = 0;
      this.application.mscGraduationYear = 0;
    }

    if (!this.application.isAiubian) {
      this.application.aiubId = "-";
    }

    if (!this.application.isBscCompleted) {
      this.application.bscGraduationYear = 0;
    } else {
      this.application.bscAdmissionYear = 0;
    }

    if (!this.application.isMscCompleted) {
      this.application.mscGraduationYear = 0;
    } else {
      this.application.mscAdmissionYear = 0;
    }

    this.application.dob = this.formatDate(new Date(this.application.dob));

    const formData = new FormData();
    formData.append('name', this.application.name.toString());
    formData.append('email', this.application.email.toString());
    formData.append('phone', this.application.phone.toString());
    formData.append('dob', this.application.dob.toString());
    formData.append('isAiubian', this.application.isAiubian.toString());
    formData.append('isBscCompleted', this.application.isBscCompleted.toString());
    formData.append('isMscCompleted', this.application.isMscCompleted.toString());
    formData.append('aiubId', this.application.aiubId.toString());
    formData.append('bscUniversity', this.application.bscUniversity.toString());
    formData.append('bscDepartment', this.application.bscDepartment.toString());
    formData.append('bscCGPA', this.application.bscCGPA.toString());
    formData.append('mscUniversity', this.application.mscUniversity.toString());
    formData.append('mscDepartment', this.application.mscDepartment.toString());
    formData.append('mscCGPA', this.application.mscCGPA.toString());
    formData.append('bscGraduationYear', this.application.bscGraduationYear.toString());
    formData.append('bscAdmissionYear', this.application.bscAdmissionYear.toString());
    formData.append('mscGraduationYear', this.application.mscGraduationYear.toString());
    formData.append('mscAdmissionYear', this.application.mscAdmissionYear.toString());
    formData.append('skills', JSON.stringify(this.application.skills));
    formData.append('cv', this.uploadedFiles.cv)
    formData.append('coverLetter', this.uploadedFiles.coverLetter)

    formData.forEach(val => console.log(val))

    this.applicationService.postApplication(formData).subscribe(
      (response) => {
        this.messageService.add({ key: 'tc', severity: 'success', summary: 'Congratulations', detail: 'Application is submitted successfully' });
      },
      (err) => {
        console.log(err)
        this.messageService.add({ key: 'tc', severity: 'error', summary: 'Failed', detail: 'An application with this email already exists.' });
      }
    );
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
    };
    this.uploadedFiles = { cv: null, coverLetter: null };
    this.messageService.add({ key: 'tc', severity: 'info', summary: 'Fields Cleared', detail: 'All data fields are cleared' });
  }
}
