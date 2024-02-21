import { Injectable } from '@angular/core';
import { LevelService } from '../../modules/level/services/level.service';
import { PersistanceService } from '../../auth/shared/services/persistance.service';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  private roles: { role: string, permissions: string[] }[] = [];

  constructor( private persistanceService: PersistanceService,private levelService: LevelService) {
    this.initializeRoles();
  }
  initializeRoles(): void {
      const myToken = this.persistanceService.get('accessToken');
      if (myToken) {
        const decodedToken = JSON.parse(atob(myToken!.split('.')[1]));
        this.setRoles(decodedToken.roles);
      }
    }
  getAllLevels(){
    return this.levelService.getAllLevels();
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
