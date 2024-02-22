import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {AddMemberComponent} from '../add-member/add-member.component';
import { MemberService } from '../../services/member.service';
import { PageEvent } from '@angular/material/paginator';
import { CompetitionService } from '../../../competition/services/competition.service';
import { AssignCompetitionComponent } from '../assign-competition/assign-competition.component';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-member',
  templateUrl: './member.component.html',
  styleUrl: './member.component.scss'
})
export class MemberComponent {

  isLoading:boolean = false;
  errorMessage:string = '';
  members:any[] = [];
  pageSize:number = 5;
  currentPageIndex:number = 0;
  lengthOfCompetitions: number =0;
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
  constructor(
    private dialog:MatDialog,
    private memberService:MemberService,
    private competitionService: CompetitionService
    ) { }

  
  ngOnInit() {
    this.isLoading = true;
    this.getAllMembers();
    this.getAllCompetitions();
  }
  getAllMembers() {
    this.memberService.getMembers().subscribe(
      (response:any) => {
        this.isLoading = false;
        this.members.push(...response.details.members);
      },
      (error) => {
        this.isLoading = false;
        this.errorMessage = error.message;
      }
    );
  }
  openAddMemberModal() {
    const dialogRef = this.dialog.open(AddMemberComponent);
    dialogRef.afterClosed().subscribe(()=>{
       this.members = [];
       this.getAllMembers();
    });
  }
  handlePageEvent(pageEvent: PageEvent) {
    this.currentPageIndex = pageEvent.pageIndex;
    this.pageSize = pageEvent.pageSize;
  }
  getAllCompetitions(){
    this.competitionService.getAllCompetitions().subscribe(
      (response: any) => {
        this.lengthOfCompetitions= response.details.Competitions.length;
      },
      (error) => {
         console.log(error)
      }
    );
  }
  openAssignComeptitionModal(id: string){
     this.dialog.open(AssignCompetitionComponent,
      {
        data: {
          id: id
        }
      });

  }

  searchMember(e:any){
    this.memberService.searchMember(e.target.value).subscribe(
      
      (response:any) => {
        this.members = [];
        this.members.push(...response.details.members);
      },
      (error) => {
        this.errorMessage = error.message;
      }
    );
  }
  getNationalityName(code: string): string {
    const nationality = this.nationalities.find(n => n.code === code);
    return nationality ? nationality.name : code;
  }
  enableUser() {
    Swal.fire({
      title: 'Are you sure?',
      text: 'You are about to enable this user.',
      icon: 'warning',
      showCancelButton: true,
      confirmButtonText: 'Yes, enable it!',
      cancelButtonText: 'No, keep it'
    }).then((result) => {
      if (result.isConfirmed) {
        console.log('User enabled');
      }
    })
  }
}
