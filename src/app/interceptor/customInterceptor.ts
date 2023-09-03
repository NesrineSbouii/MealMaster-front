import { Injectable } from '@angular/core';
import {
  HttpEvent,
  HttpHandler,
  HttpInterceptor,
  HttpRequest,
  HttpXsrfTokenExtractor,
} from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable()
export class CustomInterceptor implements HttpInterceptor {
  constructor(private tokenExtractor: HttpXsrfTokenExtractor) {}

  intercept(
    request: HttpRequest<any>,
    next: HttpHandler
  ): Observable<HttpEvent<any>> {
    const token = localStorage.getItem('token');
    console.log(request.url);
    if (
      token &&
      !request.url.includes('/login') &&
      !request.url.includes('/register')
    ) {
      request = request.clone({
        headers: request.headers.set('Authorization', 'Token ' + token),
      });
    }
    return next.handle(request);
  }
}
