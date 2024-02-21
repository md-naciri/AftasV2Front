import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private firstName = new BehaviorSubject<string>('');

  constructor(@Inject(PLATFORM_ID) private platformId: Object) {
    if (isPlatformBrowser(this.platformId)) {
      this.firstName.next(localStorage.getItem('firstName') || '');
    }
  }
  setFirstName(name: string) {
    this.firstName.next(name);
    localStorage.setItem('firstName', name);
  }

  getFirstName() {
    return this.firstName.asObservable();
  }
}
