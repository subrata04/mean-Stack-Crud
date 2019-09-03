import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})
export class StudentComponent implements OnInit {
  public addStudent: FormGroup;
  constructor( private fb: FormBuilder) {
    this.addStudent = this.fb.group({
      studentName:['', Validators.required],
      batchNo: ['', Validators.required],
      studentId: ['', Validators.required],
      bactchTime: ['', Validators.required],
      admissionDate: ['', Validators.required],
      tutionFees: ['', Validators.required],
    });
  }

  submitForm(form: FormGroup){
    console.log(this.addStudent.value);

  }
  ngOnInit() {
  }

}
