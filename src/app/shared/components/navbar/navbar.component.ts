import { Component } from '@angular/core';
import { AuthService } from '../../../auth/auth.service';
import { UserService } from '../../../auth/user.service';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.scss'
})
export class NavbarComponent {
  dropdownOpen = false;
  userName: string ="";
  constructor(private authService: AuthService,private userService: UserService, private router: Router,private toastr: ToastrService) {}
  ngOnInit() {
    this.userService.getFirstName().subscribe(name => {
      this.userName = name;
    });
  }
  logout() {
    this.authService.logout().subscribe(() => {
      localStorage.removeItem('accessToken');
      this.router.navigate(['/login']);
      this.toastr.success('Logout successful');

    }, (error) => {
      console.error('Error during logout:', error);
    });
  }
  
  toggleDropdown() {
    this.dropdownOpen = !this.dropdownOpen;
  }
}
