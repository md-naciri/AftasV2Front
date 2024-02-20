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
  nationalities = [
    {code: 'ps', name: 'Palestine'},
    {code: 'ma', name: 'Morocco'},
    {code: 'dz', name: 'Algeria'},
    {code: 'us', name: 'United States'},
    {code: 'ca', name: 'Canada'},
    {code: 'fr', name: 'France'},
    {code: 'de', name: 'Germany'},
    {code: 'it', name: 'Italy'},
    {code: 'es', name: 'Spain'},
    {code: 'gb', name: 'United Kingdom'},
    {code: 'au', name: 'Australia'},
    {code: 'br', name: 'Brazil'},
    {code: 'nl', name: 'Netherlands'},
    {code: 'se', name: 'Sweden'},
    {code: 'no', name: 'Norway'},
    {code: 'ch', name: 'Switzerland'},
    {code: 'at', name: 'Austria'},
    {code: 'be', name: 'Belgium'},
    {code: 'dk', name: 'Denmark'},
    {code: 'fi', name: 'Finland'},
    {code: 'ie', name: 'Ireland'},
    {code: 'nz', name: 'New Zealand'},
    {code: 'sg', name: 'Singapore'},
    {code: 'jp', name: 'Japan'},
    {code: 'kr', name: 'South Korea'},
    {code: 'my', name: 'Malaysia'},
    {code: 'mx', name: 'Mexico'},
    {code: 'ph', name: 'Philippines'},
    {code: 'pt', name: 'Portugal'},
    {code: 'sa', name: 'Saudi Arabia'},
    {code: 'tw', name: 'Taiwan'},
    {code: 'th', name: 'Thailand'},
    {code: 'ae', name: 'United Arab Emirates'},
    {code: 'ar', name: 'Argentina'},
    {code: 'cz', name: 'Czech Republic'},
    {code: 'gr', name: 'Greece'},
    {code: 'hu', name: 'Hungary'},
    {code: 'pl', name: 'Poland'},
    {code: 'ru', name: 'Russia'},
    {code: 'tr', name: 'Turkey'},
    {code: 'za', name: 'South Africa'},
    {code: 'cn', name: 'China'},
    {code: 'id', name: 'Indonesia'},
    {code: 'vn', name: 'Vietnam'},
    {code: 'eg', name: 'Egypt'},
    {code: 'jo', name: 'Jordan'},
    {code: 'lr', name: 'Liberia'},
    
  ];
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
      identityDocumentType: ['PASSPORT'],
      nationality: ['us'],
      identityNumber: ['', [Validators.required, Validators.minLength(5)]],
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
          identityDocumentType: this.form.get('identityDocumentType')?.value || '',
          nationality:this.form.get('nationality')?.value || '',
          identityNumber: this.form.get('identityNumber')?.value || '',
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
