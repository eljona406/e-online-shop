import { Component } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { CommonModule } from '@angular/common';
import { Registration } from '../../../shared/models/auth.model';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';

@Component({
	selector: 'app-registration',
	standalone: true,
	imports: [
		CommonModule,
		ReactiveFormsModule,
		MatFormFieldModule,
		MatInputModule,
		MatButtonModule,
	],
	templateUrl: './registration.component.html',
	styleUrls: ['./registration.component.css']
})
export class RegistrationComponent {
	registrationForm: FormGroup;
	registrationErrorMessage: string | null = null;

	constructor(
		private fb: FormBuilder,
		private authService: AuthService,
		private router: Router
	) {
		this.registrationForm = this.fb.group({
			firstName: ['', Validators.required],
			surname: ['', Validators.required],
			email: ['', [Validators.required, Validators.email]],
			password: ['', Validators.required],
			confirmPassword: ['', Validators.required],
			phoneNumber: [''], // optional
			address: this.fb.group({
				houseNumber: ['', Validators.required],
				street: ['', Validators.required],
				street2: [''], // optional
				postalCode: ['', Validators.required],
			}),
		});
	}

	onRegister() {
		const registrationData: Registration = this.registrationForm.value;

		if (
			this.registrationForm.get('password')?.value !==
			this.registrationForm.get('confirmPassword')?.value
		) {
			this.registrationErrorMessage = 'Passwords do not match!';
			return;
		}

		this.authService.register(registrationData).subscribe({
			next: (message) => {
				console.log(message);
				this.router.navigate(['/login']);
			},
			error: (error) => {
				console.error('Registration failed:', error);
				this.registrationErrorMessage = error.message; // Display error message
			},
		});
	}
}
