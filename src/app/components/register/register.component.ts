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

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
  isRegistered: boolean;
  constructor(
    private builder: FormBuilder,
    private repo: UsersRepoService,
    protected state: StateService
  ) {
    this.registerForm = this.builder.group({
      email: ['', [Validators.required, Validators.email]],
      name: ['', [Validators.required]],
      password: ['', [Validators.required]],
      age: ['', Validators.required],
      licenseYear: ['', [Validators.required]],
    });
    this.isRegistered = false;
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
      console.log('en el register', newUser);
      this.repo.register(newUser).subscribe({
        next: (user) => {
          console.log('Usuario creado:', user);
          this.isRegistered = true;
        },
        error: (err) => {
          console.error('Register error', err);
          this.isRegistered = false;
        },
      });
    } else {
      console.log('Datos de registro incorrectos');
    }
  }
}
