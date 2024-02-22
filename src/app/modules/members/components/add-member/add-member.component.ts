import { Component } from '@angular/core';
import { MemberService } from '../../services/member.service';
import { MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-add-member',
  templateUrl: './add-member.component.html',
  styleUrl: './add-member.component.scss'
})
export class AddMemberComponent {
 


  member = {
    firstName: '',
    lastName: '',
    email:'',
    password:'',
    identityNumber: '',
    identityDocumentType: 'PASSPORT',
    nationality: 'ps'
  }
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
  errorMessage: string = '';
  successMessage: string = '';
  details: string='';
  constructor(
    private memberService: MemberService,
    private dialogRef: MatDialogRef<AddMemberComponent>
  ) { }

  closeMemberModal() {
    this.errorMessage = '';
    this.successMessage = '';
    this.dialogRef.close();
  }
  saveMember() {
    this.memberService.addMember(this.member).subscribe(
      (data: any) => {
        this.successMessage = data.message;
        this.errorMessage = '';
        this.member = {
          firstName: '',
          lastName: '',
          email:'',
          password:'',
          identityNumber: '',
          identityDocumentType: '',
          nationality: ''
        };
      },
      (err: any) => {
        if (err.error.details) {
          let detailsStr = '';
          for (let key in err.error.details) {
            if (err.error.details.hasOwnProperty(key)) {
              detailsStr += err.error.details[key] + "\n";
            }
          }
          this.details = detailsStr;
        }
        this.errorMessage = err.error.message + "\n  " + this.details;
        this.successMessage = '';
        this.member = {
          firstName: '',
          lastName: '',
          email:'',
          password:'',
          identityNumber: '',
          identityDocumentType: '',
          nationality: ''
        };
      });
  }

}
