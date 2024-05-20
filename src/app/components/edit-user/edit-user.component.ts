import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { ActivatedRoute, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { UsersRepoService } from '../../services/users.repo.service';
import { User } from '../../models/user.model';

@Component({
  selector: 'app-edit-user',
  standalone: true,
  imports: [ReactiveFormsModule, RouterModule, CommonModule],
  templateUrl: './edit-user.component.html',
  styleUrls: ['./edit-user.component.css'],
})
export default class EditUserComponent implements OnInit {
  editUserForm: FormGroup;
  user!: User;
  showBankAccount: boolean = false;

  constructor(
    private fb: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private usersRepo: UsersRepoService
  ) {
    this.editUserForm = this.fb.group({
      name: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      age: ['', [Validators.required, Validators.min(0)]],
      licenseYear: ['', [Validators.required, Validators.min(1900)]],
      password: ['', Validators.required],
      bankAccount: [''],
    });
  }

  ngOnInit() {
    const userId = this.route.snapshot.paramMap.get('id');
    if (userId) {
      this.usersRepo.getDetailsById(userId).subscribe((user: User) => {
        this.user = user;
        this.editUserForm.patchValue(user);
      });
    }
  }

  toggleBankAccountVisibility() {
    this.showBankAccount = !this.showBankAccount;
  }
  keyboardBAToggle(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.toggleBankAccountVisibility();
    }
  }

  onUpdateUser() {
    console.log('En el método', this.editUserForm.value);
    if (this.editUserForm.valid) {
      const userData = this.editUserForm.value;

      this.usersRepo.updateUser(this.user.id, userData).subscribe({
        next: (updatedUser) => {
          console.log('User updated:', updatedUser);
          this.router.navigate(['/home']);
        },
        error: (err) => {
          console.error('Error updating user:', err);
        },
      });
    } else {
      console.log('Invalid form data');
    }
  }

  backHome() {
    this.router.navigate(['/home']);
  }

  keyboardHome(event: KeyboardEvent) {
    if (event.key === 'Enter') {
      this.backHome();
    }
  }
}
