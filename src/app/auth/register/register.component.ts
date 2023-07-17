import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormControl,
  FormGroup,
  Validators,
} from '@angular/forms';
import { RegisterService } from 'src/app/service/register/register.service';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit {
  registrationForm!: FormGroup;

  constructor(
    private formBuilder: FormBuilder,
    private registerService: RegisterService
  ) {}

  ngOnInit() {
    this.registrationForm = this.formBuilder.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', Validators.required],
        confirmPassword: ['', Validators.required],
      },
      { validator: this.passwordMatchValidator }
    );
  }

  onSubmit() {
    if (this.registrationForm.valid) {
      this.registerService.userRegister({
        username: this.username,
        email: this.email,
        password: this.password,
      });
    }
  }
  get username(): string {
    return this.registrationForm.get('username')?.value;
  }
  get email(): string {
    return this.registrationForm.get('email')?.value;
  }
  get password(): string {
    return this.registrationForm.get('password')?.value;
  }

  onCancel() {
    this.registrationForm.reset();
  }

  passwordMatchValidator(control: FormControl): { [key: string]: boolean } {
    const password = control.get('password');
    const confirmPassword = control.get('confirmPassword');
    if (
      password &&
      confirmPassword &&
      password.value !== confirmPassword.value
    ) {
      return { passwordMismatch: true };
    }
    return {};
  }
}
