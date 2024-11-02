import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { LocalStorageService } from '../local-storage.service';

interface Meeting {
  id: number;
  title: string;
  date: string;
  time: string;
  userId: number;
}

@Component({
  selector: 'app-schedule-meeting',
  templateUrl: './schedule-meeting.component.html',
  styleUrls: ['./schedule-meeting.component.css']
})
export class ScheduleMeetingComponent implements OnInit {
  title: string = '';
  date: string = '';
  time: string = '';
  userId: number = 0;
  meetings: Meeting[] = []; // Array to hold scheduled meetings

  private baseUrl = 'http://localhost:3000/api'; // Your backend API URL

  constructor(private http: HttpClient, private localStorageService: LocalStorageService) {}

  ngOnInit() {
    const user = JSON.parse(this.localStorageService.getItem('user') || '{}'); // Provide a default empty object
    this.userId = user.id || 0; // Get the logged-in user's ID, default to 0 if undefined
    this.getMeetings(); // Fetch existing meetings
  }

  getMeetings() {
    this.http.get<Meeting[]>(`${this.baseUrl}/meetings/${this.userId}`).subscribe(
      (data) => {
        this.meetings = data; // Assign the fetched meetings to the component's meetings array
      },
      error => {
        console.error('Error fetching meetings', error);
      }
    );
  }

  scheduleMeeting() {
    this.http.post<Meeting>(`${this.baseUrl}/meetings`, { title: this.title, date: this.date, time: this.time, userId: this.userId })
      .subscribe(response => {
        alert('Meeting scheduled successfully!');
        this.getMeetings(); // Refresh the meeting list after scheduling
        this.resetForm(); // Reset the form fields
      });
  }

  editMeeting(meeting: Meeting) {
    this.title = meeting.title;
    this.date = meeting.date;
    this.time = meeting.time;
    this.localStorageService.setItem('editingMeeting', JSON.stringify(meeting));
  }

  updateMeeting() {
    const meeting: Meeting = JSON.parse(this.localStorageService.getItem('editingMeeting') || '{}');
    this.http.put<Meeting>(`${this.baseUrl}/meetings/${meeting.id}`, { title: this.title, date: this.date, time: this.time })
      .subscribe(response => {
        alert('Meeting updated successfully!');
        this.getMeetings(); // Refresh the meeting list after updating
        this.resetForm(); // Reset the form fields
        this.localStorageService.removeItem('editingMeeting'); // Clear editing session
      });
  }

  deleteMeeting(id: number) {
    this.http.delete(`${this.baseUrl}/meetings/${id}`).subscribe(() => {
      alert('Meeting deleted successfully!');
      this.getMeetings(); // Refresh the meeting list after deleting
    });
  }

  resetForm() {
    this.title = '';
    this.date = '';
    this.time = '';
  }

  // Method to check if there is an editing meeting in localStorage
  isEditingMeeting(): boolean {
    return this.localStorageService.getItem('editingMeeting') !== null;
  }
}