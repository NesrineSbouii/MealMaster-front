import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { User } from 'src/app/models/user';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root',
})
export class RegisterService {
  baseUrl = environment.baseUrl;
  constructor(private http: HttpClient, private router: Router) {}

  userRegister(user: User) {
    const url = this.baseUrl + '/register/';
    return this.http.post(url, user).subscribe(
      (response: any) => {
        if (response.token) {
          // Redirect to "/dashboard" if the response contains a token
          this.router.navigate(['/login']);
        }
      },
      (error: any) => {
        // Handle error response
      }
    );
  }
}
