import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';

import { EmployeeService } from '../../services/employee.service';
import { SettingsService } from '../../services/settings.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-edit-employee',
  templateUrl: './edit-employee.component.html',
  styleUrls: ['./edit-employee.component.css']
})
export class EditEmployeeComponent implements OnInit {
  id: string;
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

  disableBalanceOnEdit: boolean;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService,
    private settingsService: SettingsService
  ) { }

  ngOnInit() {
    this.disableBalanceOnEdit = this.settingsService.getSettings().disableBalanceOnEdit;

    // Get id from url
    this.id = this.route.snapshot.params['id'];
    // Get employee
    this.employeeService.getEmployee(this.id).subscribe(employee => this.employee = employee);
  }

  onSubmit({value, valid}: {value: Employee, valid: boolean}) {
    // tslint:disable-next-line:whitespace
    if(!valid) {
      this.flashMessage.show('Please fill out the form correctly', {
        cssClass: 'alert-danger', timeout: 4000
      });
    } else {
      // Add id to employee
      value.id = this.id;
      // Update employee
      this.employeeService.updateEmployee(value);
      this.flashMessage.show('Employee updated', {
        cssClass: 'alert-success', timeout: 4000
      });
      // tslint:disable-next-line:whitespace
      this.router.navigate(['/employee/'+this.id]);
    }
  }

}
