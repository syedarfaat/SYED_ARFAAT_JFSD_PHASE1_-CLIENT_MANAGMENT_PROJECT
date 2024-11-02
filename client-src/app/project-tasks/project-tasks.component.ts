import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../local-storage.service'; // Import the LocalStorageService

interface Task {
  id: number;
  title: string;
  status: string;
  userId: number;
}

@Component({
  selector: 'app-project-tasks',
  templateUrl: './project-tasks.component.html',
  styleUrls: ['./project-tasks.component.css']
})
export class ProjectTasksComponent implements OnInit {
  tasks: Task[] = []; // Use the Task type for tasks
  title: string = '';
  status: string = 'pending'; // Default status
  userId: number = 0;

  private baseUrl = 'http://localhost:3000/api'; // Your backend API URL

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

  ngOnInit() {
    const user = JSON.parse(this.localStorageService.getItem('user') || '{}'); // Provide a default empty object
    this.userId = user.id || 0; // Get the logged-in user's ID, default to 0 if undefined
    this.getTasks();
  }

  getTasks() {
    this.http.get<Task[]>(`${this.baseUrl}/project-tasks/${this.userId}`).subscribe(
      (data) => {
        this.tasks = data; // Assign the fetched tasks to the component's tasks array
      },
      error => {
        console.error('Error fetching project tasks', error);
      }
    );
  }

  addTask() {
    this.http.post<Task>(`${this.baseUrl}/project-tasks`, { title: this.title, status: this.status, userId: this.userId })
      .subscribe(response => {
        this.tasks.push(response);
        this.resetForm(); // Reset the form fields after adding a task
      });
  }

  editTask(task: Task) {
    this.title = task.title;
    this.status = task.status;
    this.localStorageService.setItem('editingTask', JSON.stringify(task)); // Store the task being edited
  }

  updateTask() {
    const task: Task = JSON.parse(this.localStorageService.getItem('editingTask') || '{}');
    this.http.put<Task>(`${this.baseUrl}/project-tasks/${task.id}`, { title: this.title, status: this.status })
      .subscribe(response => {
        const index = this.tasks.findIndex(t => t.id === task.id);
        this.tasks[index] = response;
        this.resetForm(); // Reset the form fields after updating
        this.localStorageService.removeItem('editingTask'); // Clear editing session
      });
  }

  deleteTask(id: number) {
    this.http.delete(`${this.baseUrl}/project-tasks/${id}`).subscribe(() => {
      this.tasks = this.tasks.filter(t => t.id !== id);
    });
  }

  resetForm() {
    this.title = '';
    this.status = 'pending'; // Reset to default status
  }
}