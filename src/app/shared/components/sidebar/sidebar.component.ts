import { Component } from '@angular/core';
import { SharedService } from '../../services/shared.service';
import { PersistanceService } from '../../../auth/shared/services/persistance.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrl: './sidebar.component.scss'
})
export class SidebarComponent {

  numberOfLevels: number = 0;

  constructor(private sharedService: SharedService) { }

  ngOnInit() {
    this.getAllLevels();    
  }

  getAllLevels() {
    this.sharedService.getAllLevels().subscribe(
      (response: any) => {
        this.numberOfLevels = response.details.levels.length;
      },
      (error) => {
        console.error(error.message);
      }
    );
  }

  

  hasRole(role: string): boolean {
    return this.sharedService.getRoles().some(r => r.role === role);
  }

  hasPermission(permission: string): boolean {
    return this.sharedService.getRoles().some(r => r.permissions.includes(permission));
  }
}
