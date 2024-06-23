import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import {ConfirmationService} from 'primeng/api';
import { MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AdminNavComponent {
  @Output() back = new EventEmitter();

  constructor(private router: Router, private authService: AuthService, private confirmationService: ConfirmationService) { }

  items: MenuItem[] = [];


  ngOnInit(): void {
    this.items = [
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.handleLogout()
      },
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

  handleLogout() {
    this.confirmationService.confirm({
      message: 'Are you sure you want to logout?',
      accept: () => {
        this.authService.removeToken()
        this.router.navigate(['/login'])
      }
  });
  }

}
