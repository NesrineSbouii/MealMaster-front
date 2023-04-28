import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  baseUrl = environment.baseUrl
  constructor(private http: HttpClient) { }

  login(username: string, password: string) {
    // Send a POST request to the Django backend with the username and password
    return this.http.post(this.baseUrl + '/login/', { username, password });
  }
}
