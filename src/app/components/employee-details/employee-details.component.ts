import { Component, OnInit } from '@angular/core';
import { EmployeeService } from '../../services/employee.service';
import { Router, ActivatedRoute, Params } from '@angular/router';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-details',
  templateUrl: './employee-details.component.html',
  styleUrls: ['./employee-details.component.css']
})
export class EmployeeDetailsComponent implements OnInit {
  id: string;
  employee: Employee;
  // tslint:disable-next-line:no-inferrable-types
  hasSalary: boolean = false;
  // tslint:disable-next-line:no-inferrable-types
  showSalaryUpdateInput: boolean = false;

  constructor(
    private employeeService: EmployeeService,
    private router: Router,
    private route: ActivatedRoute,
    private flashMessage: FlashMessagesService
  ) { }

  ngOnInit() {
    // Get id from url
    this.id = this.route.snapshot.params['id'];
    // Get employee
    this.employeeService.getEmployee(this.id).subscribe(employee => {
      // tslint:disable-next-line:whitespace
      if(employee != null) {
        // tslint:disable-next-line:whitespace
        if(employee.salary > 0) {
          this.hasSalary = true;
        }
      }

      this.employee = employee;
    });
  }

  updateBalance() {
    this.employeeService.updateEmployee(this.employee);
    this.flashMessage.show('Balance updated', {
      cssClass: 'alert-success', timeout: 4000
    });
  }

  onDeleteClick() {
    // tslint:disable-next-line:whitespace
    if(confirm('Are you sure?')) {
      this.employeeService.deleteEmployee(this.employee);
      this.flashMessage.show('Client removed', {
        cssClass: 'alert-success', timeout: 4000
      });
      this.router.navigate(['/']);
    }
  }

}
