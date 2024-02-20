import { Component } from '@angular/core';
import { NavigationEnd, Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import {delay} from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'Aftas';
  showContent = true;
  isLoading = true;
  constructor(private router: Router,private authService: AuthService) {}
  ngOnInit() {
    this.router.events.pipe(
      delay(1000)
    ).subscribe(event => {
      if (event instanceof NavigationEnd) {
        this.showContent = !['/login', '/register','/verify-mail'].includes(event.urlAfterRedirects);
        this.isLoading = false;

      }
    });
    this.authService.logoutEvent.subscribe(() => {
      this.isLoading = true;
    });
  }
}
