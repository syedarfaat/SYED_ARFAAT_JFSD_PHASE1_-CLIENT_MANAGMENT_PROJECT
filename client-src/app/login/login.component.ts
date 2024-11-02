import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';
import { LocalStorageService } from '../local-storage.service'; // Import the LocalStorageService

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent {
  email: string = '';
  password: string = '';

  private baseUrl = 'http://localhost:3000/api'; // Your backend API URL

  constructor(private http: HttpClient, private router: Router, private localStorageService: LocalStorageService) {}

  login() {
    this.http.post(`${this.baseUrl}/login`, { email: this.email, password: this.password })
      .subscribe(
        response => {
          this.localStorageService.setItem('user', JSON.stringify(response)); // Store user info using LocalStorageService
          this.router.navigate(['/portfolios']); // Redirect to portfolios after successful login
        },
        error => {
          console.error('Error during login', error);
        }
      );
  }
}