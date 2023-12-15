import { Component } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import {AddMemberComponent} from '../add-member/add-member.component';
import { MemberService } from '../../services/member.service';
import { PageEvent } from '@angular/material/paginator';

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

  constructor(
    private dialog:MatDialog,
    private memberService:MemberService
    ) { }

  
  ngOnInit() {
    this.isLoading = true;
    this.getAllMembers();
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
}
