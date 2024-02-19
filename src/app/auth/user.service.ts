import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private firstName = new BehaviorSubject<string>('');

  setFirstName(name: string) {
    this.firstName.next(name);
  }

  getFirstName() {
    return this.firstName.asObservable();
  }
}
