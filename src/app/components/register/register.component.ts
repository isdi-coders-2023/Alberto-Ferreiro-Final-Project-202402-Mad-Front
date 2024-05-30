import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersRepoService } from '../../services/users.repo.service';
import { StateService } from '../../services/state.service';
import { UserRegisterDto } from '../../models/user.model';
import { Router, RouterLink } from '@angular/router';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export default class RegisterComponent {
  registerForm: FormGroup;
  registryError: boolean;
  error: Error;
  constructor(
    private builder: FormBuilder,
    private repo: UsersRepoService,
    protected state: StateService,
    private router: Router
  ) {
    this.registerForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      age: ['', Validators.required],
      licenseYear: ['', [Validators.required]],
    });
    this.registryError = false;
    this.error = {
      name: 'string',
      message: 'string',
      stack: 'string',
    };
  }
  onRegister() {
    if (this.registerForm.valid) {
      const { email, name, password, age, licenseYear } =
        this.registerForm.value;
      const newUser: UserRegisterDto = {
        email,
        name,
        password,
        age,
        licenseYear,
      };
      newUser.age = parseInt(age);
      newUser.licenseYear = parseInt(licenseYear);
      this.repo.register(newUser).subscribe({
        next: (user) => {
          console.log('Usuario creado:', user);
          this.registryError = false;
          this.router.navigate(['/user-login']);
        },
        error: (err) => {
          this.registryError = true;
          this.error = err;
        },
      });
    } else {
      this.registryError = true;
      console.log('Datos de registro incorrectos');
    }
  }
}
