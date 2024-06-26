import { Component, OnInit, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-apply-nav',
  templateUrl: './apply-nav.component.html',
  styleUrls: ['./apply-nav.component.css']
})
export class ApplyNavComponent implements OnInit {

  @Output() back = new EventEmitter();
  @Output() showJobInfo = new EventEmitter();

  constructor(private router: Router) { }

  items: MenuItem[] = [];


  ngOnInit(): void {
    this.items = [
      {
        label: 'Back',
        icon: 'pi pi-chevron-left',
        command: () => this.onBack()
      },
      {
        label: 'Login',
        icon: 'pi pi-sign-in',
        command: () => this.router.navigate(['/login'])
      }
    ];
  }

  onBack() {
    this.back.emit()
  }

  onShowJob() {
    this.showJobInfo.emit()
  }

}
