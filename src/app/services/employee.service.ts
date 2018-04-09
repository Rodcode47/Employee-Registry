import { Injectable } from '@angular/core';
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from 'angularfire2/firestore';
import { Observable } from 'rxjs/Observable';

import { Employee } from '../models/employee';

@Injectable()
export class EmployeeService {
  employeesCollection: AngularFirestoreCollection<Employee>;
  employeeDoc: AngularFirestoreDocument<Employee>;
  employees: Observable<Employee[]>;
  employee: Observable<Employee>;

  constructor(private afs: AngularFirestore) {
    this.employeesCollection = this.afs.collection('employees', ref => ref.orderBy('lastName', 'asc'));
  }

  getEmployees(): Observable<Employee[]> {
    // Get Employees with the id
    this.employees = this.employeesCollection.snapshotChanges().map(changes => {
      return changes.map(action => {
        const data = action.payload.doc.data() as Employee;
        data.id = action.payload.doc.id;
        return data;
      });
    });
    return this.employees;
  }

  newEmployee(employee: Employee) {
    this.employeesCollection.add(employee);
  }

  getEmployee(id: string): Observable<Employee> {
    this.employeeDoc = this.afs.doc<Employee>(`employees/${id}`);
    this.employee = this.employeeDoc.snapshotChanges().map(action => {
      if (action.payload.exists === false) {
        return null;
      } else {
        const data = action.payload.data() as Employee;
        data.id = action.payload.id;
        return data;
      }
    });

    return this.employee;
  }

  updateEmployee(employee: Employee) {
    this.employeeDoc = this.afs.doc(`employees/${employee.id}`);
    this.employeeDoc.update(employee);
  }


  deleteEmployee(employee: Employee) {
    this.employeeDoc = this.afs.doc(`employees/${employee.id}`);
    this.employeeDoc.delete();
  }

}
