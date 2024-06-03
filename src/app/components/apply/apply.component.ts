import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MessageService } from 'primeng/api';
import { JobService } from 'src/app/services/job.service';

@Component({
  selector: 'app-apply',
  templateUrl: './apply.component.html',
  styleUrls: ['./apply.component.css']
})
export class ApplyComponent implements OnInit {

  @Input() jobId: number = 0;
  constructor(private jobService: JobService, private AcRouter: ActivatedRoute) { }


  isAiubian = false
  isBscCompleted = false
  isMscCompleted = false
  isMSC = false
  showJob = false

  //fields
  name: string = ''
  university: string = ''
  dob: Date = new Date()

  uploadedFiles: any[] = [];



  ngOnInit(): void {
    this.AcRouter.queryParams.subscribe((params: any) => this.jobId = params.jobId)
  }

  onUpload(event: any) {
    for (let file of event.files) {
      this.uploadedFiles.push(file);
    }
  }

  showJobDetails() {
    this.showJob = !this.showJob
  }

  toggleIsAiubian() {
    this.isAiubian = !this.isAiubian
    if (this.isAiubian) this.university = "American International University, Bangladesh"
    else this.university = ""
  }

  toggleMsc() {
    this.isMSC = !this.isMSC
  }

  toggleIsBscCompleted() {
    this.isBscCompleted = !this.isBscCompleted
  }

  toggleIsMscCompleted() {
    this.isMscCompleted = !this.isMscCompleted
  }

}
