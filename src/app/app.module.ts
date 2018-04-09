import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { FlashMessagesModule } from 'angular2-flash-messages';

// fixing the reload or refresh of the site when running in Prod mode
import { HashLocationStrategy, LocationStrategy } from '@angular/common';

// to work with firebase database and Oauth
import { environment } from '../environments/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFirestoreModule } from 'angularfire2/firestore';
import { AngularFireAuthModule } from 'angularfire2/auth';

// for Routes
import { AppRoutingModule } from './/app-routing.module';

// Services
import { EmployeeService } from './services/employee.service';
import { SettingsService } from './services/settings.service';
import { AuthService } from './services/auth.service';

// Main Components
import { AppComponent } from './app.component';
import { DashboardComponent } from './components/dashboard/dashboard.component';
import { EmployeeListComponent } from './components/employee-list/employee-list.component';
import { AddEmployeeComponent } from './components/add-employee/add-employee.component';
import { EditEmployeeComponent } from './components/edit-employee/edit-employee.component';
import { EmployeeDetailsComponent } from './components/employee-details/employee-details.component';

// Other Components
import { NavbarComponent } from './components/navbar/navbar.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { LoginFooterComponent } from './components/login-footer/login-footer.component';
import { AdsPageComponent } from './components/ads-page/ads-page.component';
import { CopyrightComponent } from './components/copyright/copyright.component';
import { NotFoundComponent } from './components/not-found/not-found.component';

// Main Components for Settings and Authentication
import { SettingsComponent } from './components/settings/settings.component';
import { LoginComponent } from './components/login/login.component';
import { RegisterComponent } from './components/register/register.component';


@NgModule({
  declarations: [
    AppComponent,
    DashboardComponent,
    EmployeeListComponent,
    AddEmployeeComponent,
    EditEmployeeComponent,
    SettingsComponent,
    EmployeeDetailsComponent,
    LoginComponent,
    RegisterComponent,
    CopyrightComponent,
    NotFoundComponent,
    NavbarComponent,
    SidebarComponent,
    LoginFooterComponent,
    AdsPageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    FlashMessagesModule.forRoot(),
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig, 'EmployeeRegistry'),
    AngularFirestoreModule,
    AngularFireAuthModule
  ],
  providers: [EmployeeService, SettingsService, AuthService, {provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule { }
