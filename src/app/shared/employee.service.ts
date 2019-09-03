import { Injectable } from '@angular/core';
import { Employee } from './employee';
import { HttpClient } from '@angular/common/http';


@Injectable({
  providedIn: 'root'
})
export class EmployeeService {
  selectedEmployee: Employee;
  employees: Employee[];

  readonly baseURL = 'http://localhost:3000/employees';

  constructor(private http: HttpClient) { }

  postEmployee(emp: Employee) {
    return this.http.post(this.baseURL, emp);
  }

  getEmployeeList() {
    return this.http.get(this.baseURL);
  }

  getEmployeeById(_id: string)  {
    return this.http.get(this.baseURL + `/${_id}`);
  }

  deleteEmployee(_id: string) {
    return this.http.delete(this.baseURL + `/${_id}`);
  }

  putEmployee(emp: Employee) {
    console.log(emp);
    return this.http.put(this.baseURL + `/${emp._id}`, emp);
  }

}
