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
  ) { }

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
      this.jobService.getJobByID(this.jobId).subscribe((response) => {
        this.job = response.data;
        if (this.job.alreadyApplied === this.job.maximumApplication) this.dismiss();
        this.application.applicationId = this.job.jobId;
      },
        error => {
          this.messageService.add({ key: 'tc', severity: 'error', summary: 'Server Error', detail: "Internal Server Error" });
        }
      );
    });
  }

  async uploadCv(event: any) {
    //console.log("hi")
    this.application.cv = await this.fileToBase64(event.files[0])
  }
  async uploadCoverLetter(event: any) {
    //console.log("hi")
    this.application.coverLetter = await this.fileToBase64(event.files[0])
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

  formatDate(date: Date, yearOnly: boolean = false): string {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, '0');
    const day = String(date.getDate()).padStart(2, '0');
    if (yearOnly) return year.toString();
    return `${year}-${month}-${day}`;
  }

  handleApply() {

    if (!this.validate()) return;

    //prep
    this.application.dob = this.formatDate(new Date(this.application.dob));
    this.application.bscAdmissionYear = Number.parseInt(this.formatDate(new Date(this.application.bscAdmissionYear), true))
    this.application.bscGraduationYear = Number.parseInt(this.formatDate(new Date(this.application.bscGraduationYear), true))
    this.application.mscAdmissionYear = Number.parseInt(this.formatDate(new Date(this.application.mscAdmissionYear), true))
    this.application.mscAdmissionYear = Number.parseInt(this.formatDate(new Date(this.application.mscAdmissionYear), true))

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

    console.log(this.application)

    this.applicationService.postApplication(this.application).subscribe(
      (response) => {
        if (!response.isError) {
          this.messageService.add({ key: 'tc', severity: 'success', summary: 'Congratulations', detail: `Application is submitted successfully.` });
          setTimeout(() => {
            this.goBack()
          }, 3000)
        }
        else this.showListOfError(response.messages, 'Request Failed')
      },
      (err) => {
        console.log(err)
        this.messageService.add({ key: 'tc', severity: 'error', summary: 'Something went Wrong', detail: 'Server error or invalid filed vlaue(s).' });
      }
    );
  }


  validate() {
    if (!this.application.name || !this.application.email || !this.application.phone || !this.application.dob) {
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'Filed Error', detail: 'Please fill in all required fields.' });
      return false;
    }

    if (this.application.isAiubian && !this.application.aiubId) {
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'AIUB ID Error', detail: 'Please provide your AIUB Student ID.' });
      return false;
    }

    if (!this.application.bscUniversity || !this.application.bscDepartment || !this.application.bscCGPA || (!this.application.bscAdmissionYear && !this.application.bscGraduationYear)) {
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'BSc Info Error', detail: 'Please provide all BSc information.' });
      return false;
    }

    if (this.isMSC && (!this.application.mscUniversity || !this.application.mscDepartment || !this.application.mscCGPA || (!this.application.mscAdmissionYear && !this.application.mscGraduationYear))) {
      this.messageService.add({ key: 'tc', severity: 'warn', summary: 'BSc Info Error', detail: 'Please provide all MSc information.' });
      return false;
    }

    return true
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



  showListOfError(errors: string[], summary: string, severity = 'error') {
    errors.forEach(msg => {
      this.messageService.add({ key: 'tc', severity, summary, detail: msg });
    })
  }

  fileToBase64(file: File): Promise<string> {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();

      reader.onloadend = () => {
        const base64String = (reader.result as string)
          .replace('data:', '')
          .replace(/^.+,/, '');
        resolve(base64String);
      };

      reader.onerror = () => {
        reject(new Error('File reading has failed'));
      };

      reader.readAsDataURL(file);
    });
  }

}
