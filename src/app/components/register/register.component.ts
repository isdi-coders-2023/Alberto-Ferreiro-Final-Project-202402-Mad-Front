import { Component } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { UsersRepoService } from '../../services/users.repo.service';
import { StateService } from '../../services/state.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css',
})
export class RegisterComponent {
  registerForm: FormGroup;
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
  }
  onRegister() {}
}
