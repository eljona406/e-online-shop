import { Component } from '@angular/core';
import { Router, RouterModule, RouterOutlet } from '@angular/router';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { AuthService, LoginResponse } from '../../../shared/services/auth.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButton } from '@angular/material/button';
import { setHeaderVisibility } from '../../../core/store/ui/ui.actions';
import { Store } from '@ngrx/store';

@Component({
	selector: 'app-login',
	standalone: true,
	imports: [
		RouterOutlet,
		RouterModule,
		CommonModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButton,
	],
	templateUrl: './login.component.html',
	styleUrls: ['./login.component.css'], // Note: Changed styleUrl to styleUrls
})
export class LoginComponent {
	loginForm: FormGroup;
	errorMessage: string | null = null;
	password!: string;
	email!: string;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router,
		private store: Store
	) {
		this.store.dispatch(setHeaderVisibility({ isVisible: false }));
		this.loginForm = this.fb.group({
			email: ['', [Validators.required, Validators.email]],
			password: ['', [Validators.required]],
		});
	}

	onSubmit() {
		if (this.loginForm.valid) {
			const email = this.loginForm.get('email')?.value;
			const password = this.loginForm.get('password')?.value;

			this.authService.login(email, password).subscribe({
				next: (response: LoginResponse) => {
					localStorage.setItem('auth_token', response.token);
					localStorage.setItem('user_email', email);
					localStorage.setItem('user_firstName', response.firstName);
					localStorage.setItem('user_surname', response.surname);
					this.router.navigate(['/products']);
				},
				error: (error) => {
					this.errorMessage = error.message;
				},
			});
		}
	}
}
