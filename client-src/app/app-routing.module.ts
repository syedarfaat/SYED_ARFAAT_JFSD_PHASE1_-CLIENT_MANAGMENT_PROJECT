import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { PortfoliosComponent } from './portfolios/portfolios.component';
import { ProjectTasksComponent } from './project-tasks/project-tasks.component';
import { ScheduleMeetingComponent } from './schedule-meeting/schedule-meeting.component';

const routes: Routes = [
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'portfolios', component: PortfoliosComponent },
  { path: 'project-tasks', component: ProjectTasksComponent },
  { path: 'schedule-meeting', component: ScheduleMeetingComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
