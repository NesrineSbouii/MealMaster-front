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
    const url = this.baseUrl + '/login/';
    return this.http.post(url, { username, password }).subscribe(
      (response: any) => {
        if (response.token) {
          // Redirect to "/dashboard" if the response contains a token
          localStorage.setItem('token', response.token);
          this.router.navigate(['/dashboard']);
        }
      },
      (error: any) => {
        // Handle error response
      }
    );
  }
}
