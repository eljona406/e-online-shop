import { Injectable } from '@angular/core';
import { Observable, of, throwError } from 'rxjs';
import { Registration } from '../models/auth.model';

export interface LoginResponse {
	token: string;
	firstName: string;
	surname: string;
}

@Injectable({
	providedIn: 'root',
})
export class AuthService {
	private readonly TOKEN_KEY = 'auth_token';
	private readonly USERS_KEY = 'registered_users';

	public login(email: string, password: string): Observable<LoginResponse> {
		const users = this.getUsers();
		const user = users.find((u) => u.email === email && u.password === password);

		if (user) {
			const token = 'fake-token';
			localStorage.setItem(this.TOKEN_KEY, token);
			return of({
				token: token,
				firstName: user.firstName,
				surname: user.surname,
			});
		} else {
			return throwError(() => new Error('Invalid email or password'));
		}
	}

	public register(userData: Registration): Observable<{ message: string }> {
		const users = this.getUsers();

		// Check if the email is already taken
		const userExists = users.some((user) => user.email === userData.email);

		if (userExists) {
			return throwError(() => new Error('Email already in use.'));
		}

		// Save user to localStorage
		users.push({ ...userData });
		localStorage.setItem(this.USERS_KEY, JSON.stringify(users));

		return of({ message: 'Registration successful' });
	}

	// Get all registered users from localStorage
	private getUsers(): Registration[] {
		const users = localStorage.getItem(this.USERS_KEY);
		return users ? JSON.parse(users) : [];
	}

	// Check if the user is authenticated
	public isAuthenticated(): boolean {
		return !!localStorage.getItem(this.TOKEN_KEY);
	}

	// Get token from localStorage
	public getToken(): string | null {
		return localStorage.getItem(this.TOKEN_KEY);
	}

	// Log out the user
	public logout(): void {
		localStorage.removeItem(this.TOKEN_KEY);
	}
}
