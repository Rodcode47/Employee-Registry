import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';

// Components used for Routing
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';
import { SettingsComponent } from './components/settings/settings.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// Authentication Guards
import { AuthGuard } from './guards/auth.guard';
import { RegisterGuard } from './guards/register.guard';

// Routing configs
const routes: Routes = [
  {path: '', component: DashboardComponent},
  //{path: '', component: DashboardComponent, canActivate: [AuthGuard]},
  {path: 'login', component: LoginComponent},
  {path: 'register', component: RegisterComponent, canActivate: [RegisterGuard]},
  {path: 'employee/add', component: AddEmployeeComponent, canActivate: [AuthGuard]},
  {path: 'employee/edit/:id', component: EditEmployeeComponent, canActivate: [AuthGuard]},
  {path: 'employee/:id', component: EmployeeDetailsComponent, canActivate: [AuthGuard]},
  {path: 'settings', component: SettingsComponent, canActivate: [AuthGuard]},
  {path: '', redirectTo: '', pathMatch: 'full'},
  {path: '**', component: NotFoundComponent},
];

@NgModule({
  exports: [RouterModule],
  imports: [
    CommonModule,
    RouterModule.forRoot(routes)
  ],
  providers: [AuthGuard, RegisterGuard],
  declarations: []
})
export class AppRoutingModule { }
