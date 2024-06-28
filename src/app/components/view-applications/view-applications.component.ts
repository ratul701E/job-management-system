import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from 'src/app/Interface/Application';
import { ApplicationService } from 'src/app/services/application.service';
import { JobService } from 'src/app/services/job.service';
import { Job } from '../job-item/interface/Job';
import * as FileSaver from 'file-saver';
import { ConfirmationService, MessageService } from 'primeng/api';


@Component({
  selector: 'app-view-opening',
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.css'],
  providers: [MessageService, ConfirmationService]

})
export class ViewApplicationsComponent implements OnInit {

  jobId: number = 0
  job: Job | undefined
  applications: Application[] | any = []
  cols: any[] = []
  exportColumns: any[] = []
  selectedApplication: Application = {
    id: 0,
    isAiubian: false,
    isBscCompleted: false,
    isMscCompleted: false,
    name: '',
    phone: '',
    dob: '',
    email: '',
    aiubId: '',
    bscUniversity: '',
    bscDepartment: '',
    bscCGPA: 0,
    mscUniversity: '',
    mscDepartment: '',
    mscCGPA: 0,
    skills: [],
    applicationId: 0,
    expectedSalary: 0,
    bscGraduationYear: 0,
    bscAdmissionYear: 0,
    mscGraduationYear: 0,
    mscAdmissionYear: 0
  }
  showAppDetails: boolean = false


  constructor(private messageService: MessageService, private applicationService: ApplicationService, private AcRouter: ActivatedRoute, private jobService: JobService, private router: Router) { }

  ngOnInit(): void {
    this.AcRouter.queryParams.subscribe((params: any) => {
      this.jobService.getJobByID(params.jobId, "includeApplications=true").subscribe(response => {
        this.applications = response.data.jobApplications
        console.log(response)
        this.job = response.data

      },
        error => {
          this.messageService.add({ key: 'tc', severity: 'error', summary: 'Server Error', detail: "Internal Server Error" });
        })
    })

    this.cols = [
      { field: 'id', header: 'ID' },
      { field: 'applicationId', header: 'Application Id' },
      { field: 'isAiubian', header: 'Is Aiubian' },
      { field: 'isBscCompleted', header: 'Is Bsc Completed' },
      { field: 'isMscCompleted', header: 'Is Msc Completed' },
      { field: 'name', header: 'Name' },
      { field: 'phone', header: 'Phone' },
      { field: 'dob', header: 'Dob' },
      { field: 'email', header: 'Email' },
      { field: 'aiubId', header: 'Aiub Id' },
      { field: 'bscUniversity', header: 'Bsc University' },
      { field: 'bscDepartment', header: 'Bsc Department' },
      { field: 'bscCGPA', header: 'Bsc Cgpa' },
      { field: 'mscUniversity', header: 'Msc University' },
      { field: 'mscDepartment', header: 'Msc Department' },
      { field: 'mscCGPA', header: 'Msc Cgpa' },
      { field: 'bscGraduationYear', header: 'Bsc Graduation Year' },
      { field: 'bscAdmissionYear', header: 'Bsc Admission Year' },
      { field: 'mscGraduationYear', header: 'Msc Graduation Year' },
      { field: 'mscAdmissionYear', header: 'Msc Admission Year' },
      { field: 'skills', header: 'Skills' },
      { field: 'expectedSalary', header: 'Expected Salary' },
    ];


    this.exportColumns = this.cols.map(col => ({ title: col.header, dataKey: col.field }));

    // this.applicationService.getAllApplications().subscribe(applications => {
    //   this.applications = applications
    //   this.selectedApplication = this.applications[0]
    //   console.log(applications)
    // })
  }

  exportExcel() {
    import("xlsx").then(xlsx => {
      const worksheet = xlsx.utils.json_to_sheet(this.applications.map(({ cv, coverLetter, ...rest }:any) => rest));
      const workbook = { Sheets: { 'data': worksheet }, SheetNames: ['data'] };
      const excelBuffer: any = xlsx.write(workbook, { bookType: 'xlsx', type: 'array' });
      this.saveAsExcelFile(excelBuffer, "Applications_of_OpeningID_ " + this.job?.jobId);
    });
  }

  saveAsExcelFile(buffer: any, fileName: string): void {
    let EXCEL_TYPE = 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet;charset=UTF-8';
    let EXCEL_EXTENSION = '.xlsx';
    const data: Blob = new Blob([buffer], {
      type: EXCEL_TYPE
    });
    FileSaver.saveAs(data, fileName + EXCEL_EXTENSION);
  }

  onSelect() {
    console.log("Selected: ", this.selectedApplication.id)
    this.showAppDetails = true
  }

  onUnselect() {
    // console.log("Unselected ", this.selected.name)
  }

  getCurrentId(): number {
    return this.selectedApplication.id
  }

  goBack() {
    this.router.navigate(["/openings"])
  }

  showPdf(base64String: string | undefined): void {
    if(!base64String) {
      this.messageService.add({ key: 'tc', severity: 'error', summary: 'Failed To Show Document', detail: "There is something wrong or file maybe couttupted" });
      return;
    }
    const byteCharacters = atob(base64String);
    const byteNumbers = new Array(byteCharacters.length);
    for (let i = 0; i < byteCharacters.length; i++) {
        byteNumbers[i] = byteCharacters.charCodeAt(i);
    }
    const byteArray = new Uint8Array(byteNumbers);
    const blob = new Blob([byteArray], { type: 'application/pdf' });
    const blobUrl = URL.createObjectURL(blob);
    window.open(blobUrl, '_blank');
}

}
