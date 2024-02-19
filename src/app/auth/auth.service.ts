import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, Subject, tap } from 'rxjs';
import { PersistanceService } from './shared/services/persistance.service';
import { RegisterRequestInterface } from './shared/types/registerRequest.interface';
import { ResponseWithDetailsInterface } from './shared/types/responseWithDetails.interface';
import { LoginRequestInterface } from './shared/types/loginRequest.interface';
import { CurrentUserInterface } from './shared/types/currentUser.interface';
import { MailRequestInterface } from './shared/types/mailRequest.interface';
import { environment } from '../../environments/environment.deveopment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  logoutEvent = new Subject<void>();

  private readonly validationUrl = environment.apiUrlAuth + 'validate-token';

  constructor(private http:HttpClient, private persistanceService: PersistanceService) { }
  token = this.persistanceService.get('accessToken');
  googleToken: string = "";


  register(data: RegisterRequestInterface): Observable<ResponseWithDetailsInterface>{
    return this
            .http
            .post<ResponseWithDetailsInterface>(environment.apiUrlAuth+'signup',data);
  }
  login(data: LoginRequestInterface): Observable<CurrentUserInterface>{
    return this
            .http
            .post<CurrentUserInterface>(environment.apiUrlAuth+'login',data);
  }
 
 
  verifyEmail(data: MailRequestInterface): Observable<CurrentUserInterface>{
    return this
            .http
            .post<CurrentUserInterface>(environment.apiUrlAuth+'verify-email',data);
  }
  
  logout(): Observable<void> {
    this.logoutEvent.next();
    return this.http.post<void>(environment.apiUrlAuth + 'logout', {});
  }

  isTokenValid(): Observable<boolean> {
    return this.http.post<boolean>(this.validationUrl, { token: this.token });
  }
  setToken(token: string): void {
    this.token = token;
  }
  signInWithGoogle(): Observable<any>{
    return this.http.get<any>(environment.apiUrlGoogleAuth);
  }
  refreshToken(): Observable<CurrentUserInterface> {
    const refreshToken = this.persistanceService.get('refreshToken');
    return this.http.post<CurrentUserInterface>(environment.apiUrlAuth + 'refresh-token', { refreshToken }).pipe(
      tap((currentUser: CurrentUserInterface) => {
        this.persistanceService.set('accessToken', currentUser.accessToken);
        this.setToken(currentUser.accessToken);
      })
    );
  }
  

  
}