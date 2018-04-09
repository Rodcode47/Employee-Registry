import { Component, OnInit, ViewChild } from '@angular/core';
import { FlashMessagesService } from 'angular2-flash-messages';
import { EmployeeService } from '../../services/employee.service';
import { Router } from '@angular/router';
import { SettingsService } from '../../services/settings.service';

import { Employee } from '../../models/employee';

@Component({
  selector: 'app-add-employee',
  templateUrl: './add-employee.component.html',
  styleUrls: ['./add-employee.component.css']
})
export class AddEmployeeComponent implements OnInit {
  employee: Employee = {
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    position: '',
    office: '',
    salary: 0
  // tslint:disable-next-line:semicolon
  }

  disableBalanceOnAdd: boolean;

  @ViewChild('employeeForm') form: any;

  constructor(
    private flashMessage: FlashMessagesService,
    private employeeService: EmployeeService,
    private router: Router,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnAdd = this.settingsService.getSettings().disableBalanceOnAdd;
  }

  onSubmit({value, valid}: {value: Employee, valid: boolean}) {
    // tslint:disable-next-line:whitespace
    if(this.disableBalanceOnAdd) {
      value.salary = 0;
    }

    // tslint:disable-next-line:whitespace
    if(!valid) {
      // Show error
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // Add new client
      this.employeeService.newEmployee(value);
      // Show message
      this.flashMessage.show('New client added', {
        cssClass: 'alert-success', timeout: 4000
      });
      // Redirect to dash
      this.router.navigate(['/']);
    }
  }

}
