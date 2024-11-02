import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../local-storage.service'; // Import the LocalStorageService

@Component({
  selector: 'app-portfolios', // The selector for your component
  templateUrl: './portfolios.component.html', // Path to the component's HTML template
  styleUrls: ['./portfolios.component.css'] // Path to the component's CSS styles
})
export class PortfoliosComponent implements OnInit {
  portfolios: any[] = [];
  name: string = '';
  description: string = '';
  userId: number = 0; // Initialize to a default value

  private baseUrl = 'http://localhost:3000/api'; // Your backend API URL

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

  ngOnInit() {
    const user = JSON.parse(this.localStorageService.getItem('user') || '{}');
    this.userId = user.id || 0; // Get the logged-in user's ID
    this.getPortfolios();
  }

  getPortfolios() {
    this.http.get<any[]>(`${this.baseUrl}/portfolios/${this.userId}`).subscribe(
      (data) => {
        this.portfolios = data; // Assign the fetched portfolios to the component's portfolios array
      },
      error => {
        console.error('Error fetching portfolios', error);
      }
    );
  }

  addPortfolio() {
    this.http.post<any>(`${this.baseUrl}/portfolios`, { name: this.name, description: this.description, userId: this.userId })
      .subscribe(response => {
        this.portfolios.push(response);
        this.resetForm(); // Reset the form fields after adding a portfolio
      });
  }

  editPortfolio(portfolio: { id: number; name: string; description: string; }) {
    this.name = portfolio.name;
    this.description = portfolio.description;
    this.localStorageService.setItem('editingPortfolio', JSON.stringify(portfolio)); // Store the portfolio being edited
  }

  updatePortfolio() {
    const portfolio = JSON.parse(this.localStorageService.getItem('editingPortfolio') || '{}');
    this.http.put<any>(`${this.baseUrl}/portfolios/${portfolio.id}`, { name: this.name, description: this.description })
      .subscribe(response => {
        const index = this.portfolios.findIndex(p => p.id === portfolio.id);
        this.portfolios[index] = response;
        this.resetForm(); // Reset the form fields after updating
        this.localStorageService.removeItem('editingPortfolio'); // Clear editing session
      });
  }

  deletePortfolio(id: number) {
    this.http.delete(`${this.baseUrl}/portfolios/${id}`).subscribe(() => {
      this.portfolios = this.portfolios.filter(p => p.id !== id);
    });
  }

  resetForm() {
    this.name = '';
    this.description = '';
  }
}