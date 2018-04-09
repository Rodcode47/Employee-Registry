import { Component, OnInit } from '@angular/core';

import { EmployeeService } from '../../services/employee.service';
import { Employee } from '../../models/employee';

@Component({
  selector: 'app-employee-list',
  templateUrl: './employee-list.component.html',
  styleUrls: ['./employee-list.component.css']
})
export class EmployeeListComponent implements OnInit {
  employees: Employee[];
  totalOwed: number;

  constructor(private employeeService: EmployeeService) { }

  ngOnInit() {
    this.employeeService.getEmployees().subscribe(employees => {
      this.employees = employees;
      this.getTotalOwed();
    });
  }

  getTotalOwed() {
    this.totalOwed = this.employees.reduce((total, employee) => {
      return total + parseFloat(employee.salary.toString());
    }, 0);
  }

}
