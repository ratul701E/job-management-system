import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Application } from 'src/app/Interface/Application';
import { ApplicationService } from 'src/app/services/application.service';

@Component({
  selector: 'app-single-application',
  templateUrl: './single-application.component.html',
  styleUrls: ['./single-application.component.css']
})
export class SingleApplicationComponent implements OnInit {

  constructor() {}
  ngOnInit(): void {
    
  }

  @Input() application: Application = {
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
    id: 0
  }
}
