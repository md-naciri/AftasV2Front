import { Component } from '@angular/core';
import { selectIsSubmitting, selectValidationErrors } from '../../store/reducer';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MessageService } from '../../shared/services/message.service';
import { MailRequestInterface } from '../../shared/types/mailRequest.interface';
import { verifyEmailActions } from '../../store/action';
import { combineLatest } from 'rxjs';
import { Store } from '@ngrx/store';

@Component({
  selector: 'app-mail',
  templateUrl: './mail.component.html',
  styleUrl: './mail.component.scss'
})
export class MailComponent {
  showBackendError = true;
  showBackendSuccess = true;
  message: string ='';

  data$ = combineLatest({
    isSubmiting: this.store.select(selectIsSubmitting),
    backendErrors: this.store.select(selectValidationErrors),
  })
  constructor(private store: Store,
    private fb: FormBuilder,private messageService: MessageService) { }
  
    ngOnInit() {
      this.messageService.currentMessage.subscribe((message: string) => this.message = message);
    }
    formMailVerification = this.fb.group({
      code: ['', [Validators.required, Validators.pattern('^[0-9]{6}$')]]
    });

    getFirstError(error: any): string {
      return error;
    }

    verifyEmail() {
      this.showBackendError = true;
      this.markFormControlsAsTouched(this.formMailVerification);
      console.log(this.formMailVerification.getRawValue());
      if (this.formMailVerification.valid) {
        const request: MailRequestInterface = {
          code: this.formMailVerification.get('code')?.value || ''
        };
        this.store.dispatch(verifyEmailActions.mail({ request }));
      }
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
