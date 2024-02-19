import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { loginActions } from '../../store/action';
import { LoginRequestInterface } from '../../shared/types/loginRequest.interface';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { selectIsSubmitting, selectValidationErrors } from '../../store/reducer';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { AuthService } from '../../auth.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent {
  url: string = "";

  showBackendError = true;
  data$ = combineLatest({
    isSubmiting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })
  constructor(private store: Store,
    private fb: FormBuilder,private http:HttpClient,private route: ActivatedRoute,private authService:AuthService) { }
  
    formLogin = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });

  signIn() {
    this.showBackendError = true;
    this.markFormControlsAsTouched(this.formLogin);
    if (this.formLogin.valid) {
      const request: LoginRequestInterface = this.formLogin.getRawValue();
      this.store.dispatch(loginActions.login({ request }));
    }
  }
  
  getFirstError(errors: any): string {
    const firstKey = Object.keys(errors)[0];
    return errors[firstKey];
  }
  markFormControlsAsTouched(formGroup: FormGroup) {
    Object.values(formGroup.controls).forEach(control => {
      control.markAsTouched();

      if (control instanceof FormGroup) {
        this.markFormControlsAsTouched(control);
      }
    });
  }
}
