import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LoginService } from 'src/app/service/auth/login.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;

  constructor(private fb: FormBuilder, private loginservice: LoginService) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit() {
    this.loginservice.login(
      this.userNameControl.value,
      this.PasswordControl.value
    );
  }
  get userNameControl() {
    return this.loginForm.controls['username'];
  }
  get PasswordControl() {
    return this.loginForm.controls['password'];
  }
}
