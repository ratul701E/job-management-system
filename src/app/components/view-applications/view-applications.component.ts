import { Component, OnInit } from '@angular/core';
import { Application } from 'src/app/Interface/Application';
import { ApplicationService } from 'src/app/services/application.service';


@Component({
  selector: 'app-view-opening',
  templateUrl: './view-applications.component.html',
  styleUrls: ['./view-applications.component.css'],

})
export class ViewApplicationsComponent implements OnInit {

  applications: Application[]= []
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


  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.applicationService.getAllApplications().subscribe(applications => {
      this.applications = applications
      this.selectedApplication = this.applications[0]
      console.log(applications)
    })
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

}
