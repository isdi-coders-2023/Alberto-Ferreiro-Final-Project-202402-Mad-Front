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

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [ReactiveFormsModule],

  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
})
export class LoginComponent {
  loginForm: FormGroup;
  passCheck: boolean = true;

  constructor(
    private fb: FormBuilder,
    protected state: StateService,
    private repo: UsersRepoService
  ) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', [Validators.required]],
      confirmPassword: ['', Validators.required],
    });
  }

  onLogin() {
    if (this.loginForm.valid) {
      const { email, password, confirmPassword } = this.loginForm.value;
      if (password !== confirmPassword) {
        this.passCheck = false;
        console.log('Las contraseñas no coinciden');
        return;
      } else {
        this.passCheck = true;
      }

      const userLogin: UserLoginDto = { email, password };

      this.repo.login(userLogin).subscribe({
        next: ({ token }) => {
          this.state.setLogin(token);
        },
        error: (err) => {
          console.error('Login error:', err);
          this.state.setLoginState('error');
        },
      });
    } else {
      console.log('Datos incorrectos');
    }
  }
  getLoginState() {
    return this.state.state.loginState;
  }
}
