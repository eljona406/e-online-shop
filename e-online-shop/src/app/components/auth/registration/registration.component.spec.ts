import { ComponentFixture, TestBed } from '@angular/core/testing';
import { RegistrationComponent } from './registration.component';
import { provideMockStore } from '@ngrx/store/testing';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule } from '@angular/forms';
import { AuthService } from '../../../shared/services/auth.service';
import { Router } from '@angular/router';
import { of, throwError } from 'rxjs';

describe('RegistrationComponent', () => {
	let component: RegistrationComponent;
	let fixture: ComponentFixture<RegistrationComponent>;
	let authService: jasmine.SpyObj<AuthService>;
	let router: jasmine.SpyObj<Router>;

	beforeEach(async () => {
		authService = jasmine.createSpyObj('AuthService', ['register']);
		router = jasmine.createSpyObj('Router', ['navigate']);

		await TestBed.configureTestingModule({
			imports: [RegistrationComponent, ReactiveFormsModule, BrowserAnimationsModule],
			providers: [
				provideMockStore(),
				{ provide: AuthService, useValue: authService },
				{ provide: Router, useValue: router },
			],
		}).compileComponents();

		fixture = TestBed.createComponent(RegistrationComponent);
		component = fixture.componentInstance;
		fixture.detectChanges();
	});

	it('should create the component', () => {
		expect(component).toBeTruthy();
	});

	it('should register the user and navigate to login on valid form submission', () => {
		// Arrange: Fill the form with valid data
		component.registrationForm.setValue({
			firstName: 'John',
			surname: 'Doe',
			email: 'john.doe@example.com',
			password: 'password123',
			confirmPassword: 'password123',
			phoneNumber: '1234567890',
			address: {
				houseNumber: '123',
				street: 'Main St',
				street2: '',
				postalCode: '12345',
			},
		});

		// Mock the register method to return a successful response with the expected type
		authService.register.and.returnValue(of({ message: 'Registration successful' }));

		component.onRegister();

		// Check that the register method was called and navigation occurred
		expect(authService.register).toHaveBeenCalledWith(component.registrationForm.value);
		expect(router.navigate).toHaveBeenCalledWith(['/login']);
		expect(component.registrationErrorMessage).toBeNull(); // No error should occur
	});

	it('should set an error message when passwords do not match', () => {
		component.registrationForm.setValue({
			firstName: 'John',
			surname: 'Doe',
			email: 'john.doe@example.com',
			password: 'password123',
			confirmPassword: 'differentpassword',
			phoneNumber: '1234567890',
			address: {
				houseNumber: '123',
				street: 'Main St',
				street2: '',
				postalCode: '12345',
			},
		});

		component.onRegister();

		// Check that the error message is set
		expect(component.registrationErrorMessage).toBe('Passwords do not match!');
		expect(authService.register).not.toHaveBeenCalled();
	});

	it('should set an error message when registration fails', () => {
		component.registrationForm.setValue({
			firstName: 'John',
			surname: 'Doe',
			email: 'john.doe@example.com',
			password: 'password123',
			confirmPassword: 'password123',
			phoneNumber: '1234567890',
			address: {
				houseNumber: '123',
				street: 'Main St',
				street2: '',
				postalCode: '12345',
			},
		});

		authService.register.and.returnValue(
			throwError(() => ({ message: 'Registration failed' }))
		);

		component.onRegister();

		expect(component.registrationErrorMessage).toBe('Registration failed');
		expect(router.navigate).not.toHaveBeenCalled();
	});
});
