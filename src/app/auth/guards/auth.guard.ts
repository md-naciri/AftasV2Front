import { ActivatedRouteSnapshot, CanActivate, CanActivateFn, RouterStateSnapshot, UrlTree,Router } from '@angular/router';
import { Observable, map } from 'rxjs';
import { AuthService } from '../auth.service';
import { Injectable } from '@angular/core';
import { PersistanceService } from '../shared/services/persistance.service';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {
  private roles: { role: string, permissions: string[] }[] = [];

  constructor(private authService: AuthService, private router: Router,private persistanceService:PersistanceService) {}
  
  setRoles(roles: { role: string, permissions: string[] }[]): void {
    this.roles = roles;
  }

  getRoles(): { role: string, permissions: string[] }[] {
    return this.roles;
  }
  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot): Observable<boolean | UrlTree> | Promise<boolean | UrlTree> | boolean | UrlTree {
    
    return this.authService.isTokenValid().pipe(
      map((isValid : boolean) => {
        if (!isValid) {
          this.router.navigate(['/login']);
        }
          return isValid;
      })
    );
  }
  
}
