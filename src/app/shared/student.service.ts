import { Injectable } from '@angular/core';
import { Student } from '../shared/student';
import { HttpClient } from '@angular/common/http';
@Injectable({
  providedIn: 'root'
})
export class StudentService {
  readonly url = 'http://localhost:3000/students';
  selectedStudent: Student;
  students: Student[];

  constructor(private http: HttpClient) { }

  addStudent(stdn: Student) {
    return this.http.post(this.url, stdn);
  }
  getStudentlist() {
    return this.http.get(this.url);
  }

  getstudentByid(_id: string)  {
    return this.http.get(this.url + `/${_id}`);
  }

  deleteStudent(_id:string){
    return this.http.delete(this.url + `/${_id}`);
  }
  editStudent(stdn: Student){
    return this.http.put(this.url + `/${stdn._id}`, stdn);
  }
}
