import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
@Injectable({
  providedIn: 'root',
})
export class LoginService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private router: Router) {}

  login(username: string, password: string) {
    // Send a POST request to the Django backend with the username and password
    return this.http
      .post(this.baseUrl + '/login/', { username, password })
      .subscribe(
        (response: any) => {
          if (response.token) {
            // Redirect to "/dashboard" if the response contains a token
            this.router.navigate(['/dashboard']);
          }
        },
        (error: any) => {
          // Handle error response
        }
      );
  }
}
