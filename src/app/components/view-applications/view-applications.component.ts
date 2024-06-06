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
  selectedApplication: Application | undefined


  constructor(private applicationService: ApplicationService) { }

  ngOnInit(): void {
    this.applicationService.getAllApplications().subscribe(applications => {
      this.applications = applications
      this.selectedApplication = this.applications[0]
    })
  }

  onSelect() {
    console.log("Selected: ", this.selectedApplication?.name)
  }

  onUnselect() {
    // console.log("Unselected ", this.selected.name)

  }

}
