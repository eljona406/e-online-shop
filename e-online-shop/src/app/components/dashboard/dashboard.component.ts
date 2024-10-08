import { Component } from '@angular/core';
import { RegistrationComponent } from '../auth/registration/registration.component';
import { LoginComponent } from '../auth/login/login.component';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [LoginComponent, RegistrationComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent {

}
