import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Application } from 'src/app/Interface/Application';
import { ApplicationService } from 'src/app/services/application.service';
import { JobService } from 'src/app/services/job.service';
import { Job } from '../job-item/interface/Job';


@Component({
  selector: 'app-view-opening',
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.css'],

})
export class ViewApplicationsComponent implements OnInit {

  jobId: number = 0
  job: Job | undefined
  applications: Application[] | any = []
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
    skills: []
  }
  showAppDetails: boolean = false


  constructor(private applicationService: ApplicationService, private AcRouter: ActivatedRoute, private jobService: JobService, private router: Router) { }

  ngOnInit(): void {
    this.AcRouter.queryParams.subscribe((params: any) => {
      this.jobService.getJobByID(params.jobId).subscribe(job => {
        this.applications = job.jobApplications
        this.job = job

      })
    })

    // this.applicationService.getAllApplications().subscribe(applications => {
    //   this.applications = applications
    //   this.selectedApplication = this.applications[0]
    //   console.log(applications)
    // })
  }

  onSelect() {
    console.log("Selected: ", this.selectedApplication.id)
    this.showAppDetails = true
  }

  onUnselect() {
    // console.log("Unselected ", this.selected.name)
  }

  getCurrentId() : number {
    return this.selectedApplication.id
  }

  goBack() {
    this.router.navigate(["/openings"])
  }

}
