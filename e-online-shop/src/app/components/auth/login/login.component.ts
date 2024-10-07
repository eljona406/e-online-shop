import { Component } from '@angular/core';
import { Router, RouterOutlet } from '@angular/router';
import {
	FormBuilder,
	FormGroup,
	FormsModule,
	ReactiveFormsModule,
	Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, LoginResponse } from '../../../shared/services/auth.service';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [RouterOutlet, FormsModule, CommonModule, ReactiveFormsModule],
	templateUrl: './login.component.html',
	styleUrl: './login.component.css',
})
export class LoginComponent {
	loginForm: FormGroup;
	errorMessage: string | null = null;
	password!: string;
	email!: string;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router
	) {
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
		});
	}

	onSubmit(): void {
		if (this.loginForm.valid) {
			const { email, password } = this.loginForm.value;

			this.authService.login(email, password).subscribe({
				next: (response: LoginResponse) => {
					console.log('Login successful:', response);
					this.router.navigate(['/']);
				},
				error: (error) => {
					console.error('Login failed:', error);
					this.errorMessage = error.message;
				},
			});
		} else {
			console.log('Form is invalid', this.loginForm.errors); // Log form errors if any
		}
	}
}
