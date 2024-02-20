import { HttpEvent, HttpHandler, HttpInterceptor, HttpInterceptorFn, HttpRequest, HttpResponse } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, tap } from 'rxjs';
import { PersistanceService } from '../shared/services/persistance.service';
import { Router } from '@angular/router';

@Injectable()
export class AuthInterceptor implements HttpInterceptor {
  constructor(private persistanceService:PersistanceService,private router:Router) {}

  intercept(request: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    console.log('Outgoing HTTP request', request.url);

    if (request.url.endsWith('/login') || request.url.endsWith('/signup') || request.url.endsWith('/validate-token') || request.url.endsWith('/verify-email') ){
      console.log('auth request');
      return next.handle(request);
    }
    const token = this.persistanceService.get('accessToken');

    if (token) {
      const newCloneRequest = request.clone({
        setHeaders: {
          Authorization: `Bearer ${token}`
        }
      });
      return next.handle(newCloneRequest).pipe(
        tap(
          (event: HttpEvent<any>) => {
            if (event instanceof HttpResponse) {
              console.log('HTTP Response:', event);
            }
          },
          (error) => {
            console.error('HTTP Error:', error);
          }
        )
      );
    } else {
      console.error('Access token not found');
      return next.handle(request);
    }
  }
}
