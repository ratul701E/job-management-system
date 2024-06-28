import { Component, EventEmitter, Output } from '@angular/core';
import { Router } from '@angular/router';
import { MenuItem } from 'primeng/api';
import { AuthService } from 'src/app/services/auth.service';
import { ConfirmationService, MessageService } from 'primeng/api';

@Component({
  selector: 'app-admin-nav',
  templateUrl: './admin-nav.component.html',
  styleUrls: ['./admin-nav.component.css'],
  providers: [ConfirmationService, MessageService]
})
export class AdminNavComponent {
  @Output() back = new EventEmitter();

  items: MenuItem[] = [];

  constructor(
    private router: Router,
    private authService: AuthService,
    private confirmationService: ConfirmationService,
    private messageService: MessageService
  ) {}

  ngOnInit(): void {
    this.items = [
      {
        label: 'Logout',
        icon: 'pi pi-sign-out',
        command: () => this.showConfirm()
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
      },
      {
        label: 'Add Opening',
        icon: 'pi pi-plus',
        command: () => this.router.navigate(['/add-opening'])
      }
    ];
  }

  onBack() {
    this.back.emit();
  }

  onViewOpenings() {
    this.router.navigate(['/openings']);
  }

  showConfirm() {
    this.messageService.clear('confirm');
    this.messageService.add({ 
      key: 'confirm', 
      severity: 'info', 
      summary: 'Logout Confirmation', 
      detail: 'Are you sure you want to logout?', 
      sticky: true 
    });
  }

  onReject() {
    this.messageService.clear('confirm');
  }

  onConfirm() {
    this.authService.removeToken();
    this.router.navigate(['/login']);
    this.messageService.clear('confirm');
  }
}
