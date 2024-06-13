import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css']
})
export class AdminNavComponent {
  @Output() back = new EventEmitter();

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
        label: 'View Openings',
        icon: 'pi pi-list',
        command: () => this.onViewOpenings()
      }
    ];
  }

  onBack() {
    this.back.emit()
  }

  onViewOpenings() {
    console.log("called")
    this.router.navigate(["/openings"])
  }

}
