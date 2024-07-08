import { Component, Input, OnInit } from '@angular/core';
import { FeedbackService } from 'src/app/services/feedback.service';

@Component({
  selector: 'app-connect',
  templateUrl: './connect.component.html',
  styleUrls: ['./connect.component.css']
})
export class ConnectComponent implements OnInit {
  
  constructor(private feedbackService: FeedbackService) {}
  feedback: boolean = true

  ngOnInit(): void {
    setInterval(() => {
      this.feedbackService.getFeedback().subscribe(response => {
        this.feedback = true;
      },
        error => {
          this.feedback = false;
        }
      )
    }, 2000)
  }

}
