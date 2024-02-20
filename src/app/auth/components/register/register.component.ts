import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';
import { selectIsSubmitting, selectValidationErrors } from '../../store/reducer';
import { RegisterRequestInterface } from '../../shared/types/registerRequest.interface';
import { authActions } from '../../store/action';
@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss'
})
export class RegisterComponent {
  showBackendError = true;
  
  data$ = combineLatest({
    isSubmiting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })
  constructor(
    private fb: FormBuilder,
    private store: Store) { }

    form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(2)]],
      lastName: ['', [Validators.required, Validators.minLength(2)]],
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required, Validators.minLength(8)]]
    });
    onSubmit() {
      this.showBackendError = true;
      this.markFormControlsAsTouched(this.form);
      if (this.form.valid) {
        const request: RegisterRequestInterface = {
          firstName: this.form.get('firstName')?.value || '',
          lastName: this.form.get('lastName')?.value || '',
          email: this.form.get('email')?.value || '',
          password: this.form.get('password')?.value || '',
        };
        this.store.dispatch(authActions.register({ request }));
      }
    }

    getFirstError(errors: any): string {
      const firstKey = Object.keys(errors)[0];
      return errors[firstKey];
    }

    markFormControlsAsTouched(formGroup: FormGroup) {
      Object.values(formGroup.controls).forEach(control => {
        control.markAsTouched();
        control.markAsDirty();
    
        if (control instanceof FormGroup) {
          this.markFormControlsAsTouched(control);
        }
      });
    }
}
