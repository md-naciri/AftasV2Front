import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../../../environments/environment.deveopment';
import { Observable, catchError, throwError } from 'rxjs';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class CompetitionService {

  constructor(private httpClient:HttpClient,private router:Router) { }

  getAllCompetitions() : Observable<any>{
    return this.httpClient.get(environment.apiURL +'competitions');
  }
  addCompetition(competition:any){
    return this.httpClient.post(environment.apiURL +'competition',competition);
  }
  getCompetitionByStatus(status:string){
    return this.httpClient.get(environment.apiURL +'competition/'+status);
  }
}
