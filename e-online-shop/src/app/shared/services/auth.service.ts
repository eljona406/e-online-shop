import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';

export interface LoginResponse {
	token: string;
}

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly TOKEN_KEY = 'auth_token';
	private readonly USER_EMAIL_KEY = 'user_email';

	public login(email: string, password: string): Observable<LoginResponse> {
		const trimmedEmail = email.trim();
		const trimmedPassword = password.trim();

		console.log('Attempting to login with 1111:', trimmedEmail, trimmedPassword);

		if (trimmedEmail === 'test@gmail.com' && trimmedPassword === '123') {
			const token = 'fake-jwt-token'; // Replace with a real token from API
			localStorage.setItem(this.TOKEN_KEY, token);
			localStorage.setItem(this.USER_EMAIL_KEY, trimmedEmail);
			return of({ token });
		} else {
			return throwError(() => new Error('Invalid email or password'));
		}
	}

	public logout(): void {
		localStorage.removeItem(this.TOKEN_KEY);
	}
}
