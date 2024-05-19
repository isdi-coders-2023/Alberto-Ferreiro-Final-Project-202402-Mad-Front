import { Component } from '@angular/core';
import {
  FormBuilder,
  Validators,
  ReactiveFormsModule,
  FormGroup,
} from '@angular/forms';
import { StateService } from '../../services/state.service';
import { UserLoginDto } from '../../models/user.model';
import { UsersRepoService } from '../../services/users.repo.service';
import { RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export default class LoginComponent {
  loginForm: FormGroup;
  errorMessage: string = '';

  constructor(
    private fb: FormBuilder,
    protected state: StateService,
    private repo: UsersRepoService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password } = this.loginForm.value;

      const userLogin: UserLoginDto = { email, password };

      this.repo.login(userLogin).subscribe({
        next: ({ token }) => {
          this.state.setLogin(token);
        },
        error: (err) => {
          console.error('Login error:', err);
          this.state.setLoginState('error');
          this.errorMessage = 'Login failed. Please check your credentials.';
        },
      });
    } else {
      this.errorMessage = 'Please enter valid email and password.';
      console.log('Datos incorrectos');
    }
  }
  getLoginState() {
    return this.state.state.loginState;
  }
}
