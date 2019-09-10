import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormGroupDirective } from '@angular/forms';
import { StudentService } from '../../../shared/student.service';
import { from } from 'rxjs';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { Student } from '../../../shared/student';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';


export interface DialogData {
  _id: any;
}

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css']
})

export class StudentComponent implements OnInit {
  public addStudent: FormGroup;
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

  private totalStudent: any = {};
  dataSource: MatTableDataSource<Student>;
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor( private fb: FormBuilder, private studentService: StudentService, public snackBar: MatSnackBar, private dialog: MatDialog ) {
    this.addStudent = this.fb.group({
      name: ['', Validators.required],
      batchNo: ['', Validators.required],
      studentId: ['', Validators.required],
      batchTime: ['', Validators.required],
      admissionDate: ['', Validators.required],
      tusionFees: ['', Validators.required],
    });
  }

  submitForm(form: FormGroup) {
    console.log(this.addStudent.value);
    if (this.addStudent.valid) {
      this.studentService.addStudent(this.addStudent.value).subscribe((res) => {
        this.getallstudent();
        let message = "Student Added successfully";
        let action = "Ok";
        this.snackBar.open(message, action, {
          duration: 2000,
          panelClass: ['blue-snackbar']
        });
      })
      this.formDirective.resetForm();
    }

  }
  ngOnInit() {
    this.getallstudent();
  }

  getallstudent() {
    this.studentService.getStudentlist().subscribe((res) => {
      this.totalStudent = res;
      this.dataSource = new MatTableDataSource<Student>(this.totalStudent);

      this.dataSource.paginator = this.paginator;
    })

  }
  // data table
  displayedColumns: string[] = ['Student Name', 'Batch No', 'Student Id', 'Batch Time', 'Admission Date', 'Tusion Fees', 'Action'];

  // EDIT Trigger model
  StudentEdit(_id) {
    // console.log(_id);
    const dialogRef = this.dialog.open(EditComponent2, {
      data: _id
    }).afterClosed()
      .subscribe(() => this.getallstudent());
  }
  // delete modal trigger
  StudentDelete(_id) {
    // console.log(_id);
    const DeleteDialogref = this.dialog.open(StudentDelete, {
      data: _id
    }).afterClosed().subscribe(() => this.getallstudent());

  }


}
// For Edit component

@Component({
  templateUrl: './edit.html',
  styleUrls: ['./student.component.css']
})

export class EditComponent2 {
  public Id: string;
  public _id: string;

  constructor(private snackBar: MatSnackBar,  private fb: FormBuilder, private service: StudentService, public dialogRef: MatDialogRef<EditComponent2>, @Inject(MAT_DIALOG_DATA) public data1: any = Student) {

    console.log(data1);

    this.service.getstudentByid(data1).subscribe(data => {
      let result: any = {};
      result = data;
      this.Id = result._id;

      console.log(data);

      this.editStudent.setValue({
        name: result.name,
        batchNo: result.batchNo,
        studentId: result.studentId,
        batchTime: result.batchTime,
        admissionDate: result.admissionDate,
        tusionFees: result.tusionFees
      });
      // console.log(this.id)
    })
    this.editStudent = this.fb.group({
      name: ['', Validators.required],
      batchNo: ['', Validators.required],
      studentId: ['', Validators.required],
      batchTime: ['', Validators.required],
      admissionDate: ['', Validators.required],
      tusionFees: ['', Validators.required]
    })


  }
  public editStudent: FormGroup;

  submitForm(form: FormGroup) {
    let Data: any = this.editStudent.value;
    Data._id = this.Id;

    if (this.editStudent.valid) {
      this.service.editStudent(Data).subscribe((res) => {
        let message = "Updated Successfully";
        let action = "Ok";
        this.snackBar.open(message, action, { duration: 1000, panelClass: ['blue-snackbar'] });
        setTimeout(() => {
          this.dialogRef.close();
        }, 1500);
      })
    }


  }

}

// For Delete component

@Component({
  templateUrl: './delete.html',
  styleUrls: ['./student.component.css']
})

export class StudentDelete {
  _id: any;
  constructor(public dialogRef: MatDialogRef<StudentDelete>, @Inject(MAT_DIALOG_DATA) public data2: any = Student, public service: StudentService, public snackBar: MatSnackBar) {
    this._id = data2;
  }

  onDelete(_id) {
    console.log(_id);
    this.service.deleteStudent(_id).subscribe(res => {
      console.log("Successfully Deleted");
      let message = "Data Deleted Successfully";
      let action = "Ok";
      this.snackBar.open(message, action, { duration: 1000, });
        setTimeout(() => {
          this.dialogRef.close();
        }, 1500);
    });
  }

}
