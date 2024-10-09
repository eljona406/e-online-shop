import { Component } from '@angular/core';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { LoginComponent } from '../auth/login/login.component';
import { HeaderComponent } from '../../shared/components/header/header.component';
import { Store } from '@ngrx/store';
import { setMenuVisibility } from '../../core/store/ui/ui.actions';

@Component({
	selector: 'app-dashboard',
	standalone: true,
	imports: [LoginComponent, RegistrationComponent, HeaderComponent],
	templateUrl: './dashboard.component.html',
	styleUrl: './dashboard.component.css',
})
export class DashboardComponent {
	constructor(private store: Store) {
		this.store.dispatch(setMenuVisibility({ isVisible: false }));
	}
}
