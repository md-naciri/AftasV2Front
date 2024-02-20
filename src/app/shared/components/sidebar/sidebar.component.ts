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
  private roles: { role: string, permissions: string[] }[] = [];

  constructor(private sharedService: SharedService, private persistanceService: PersistanceService) { }

  ngOnInit() {
    this.getAllLevels();
    console.log('RoleService');
    const myToken = this.persistanceService.get('accessToken');
    if (myToken) {
      const decodedToken = JSON.parse(atob(myToken!.split('.')[1]));
      console.log(decodedToken.roles)
      this.setRoles(decodedToken.roles);
    }

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

  setRoles(roles: { role: string, permissions: string[] }[]): void {
    this.roles = roles;
  }

  getRoles(): { role: string, permissions: string[] }[] {
    return this.roles;
  }

  hasRole(role: string): boolean {
    return this.roles.some(r => r.role === role);
  }

  hasPermission(permission: string): boolean {
    return this.roles.some(r => r.permissions.includes(permission));
  }
}
