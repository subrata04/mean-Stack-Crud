import { Component, OnInit, ViewChild, Inject } from '@angular/core';
import { EmployeeService } from 'src/app/shared/employee.service';
import { Employee } from 'src/app/shared/employee';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginator } from '@angular/material/paginator';
import { FormBuilder, FormGroup, Validators, FormGroupDirective } from '@angular/forms';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';

@Component({
  selector: 'app-employee',
  templateUrl: './employee.component.html',
  styleUrls: ['./employee.component.css']
})

export class EmployeeComponent implements OnInit {

  private id: string;
  // for reset form after submit
  @ViewChild(FormGroupDirective) formDirective: FormGroupDirective;

  public employee: any;
  dataSource: MatTableDataSource<Employee>;
  mainArray: any = [];
  // toggle div
  public toggle: boolean = false;

  public addform: FormGroup;

  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private employeeService: EmployeeService, public fb: FormBuilder, private snackBar: MatSnackBar, private dialog: MatDialog) {
    this.addform = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      office: ['', Validators.required],
      salary: ['', Validators.required]
    })
  }



  ngOnInit() {
    this.refreshEmployeeList();
  }


  submitForm(form: FormGroup) {
    console.log(this.addform.value);

    if (this.addform.valid) {
      this.employeeService.postEmployee(this.addform.value).subscribe((res) => {
        this.refreshEmployeeList();

        let message = "SuccessFully submited";
        let action = "Ok";
        this.snackBar.open(message, action, {
          duration: 2000,
        });
        this.formDirective.resetForm();
      });
    } else {
      console.error("fill the form sir");

    }

  }

  refreshEmployeeList() {
    this.employeeService.getEmployeeList().subscribe((res) => {
      this.mainArray = res;
      this.dataSource = new MatTableDataSource<Employee>(this.mainArray);

      setTimeout(() => {
        this.dataSource.paginator = this.paginator;
      }, 0);

    });
  }
  displayedColumns: string[] = ['name', 'position', 'office', 'salary', 'Action'];

  // Applied filter
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  onDelete(_id: string) {
    if (confirm('Are you sure to delete this record ?') == true) {
      this.employeeService.deleteEmployee(_id).subscribe((res) => {
        this.refreshEmployeeList();

      });
    }
  }


  expression(row: any) {
    // console.log(row)
    const dialogRef = this.dialog.open(SuccessModal, {
      data: row
    });

    dialogRef.afterClosed().subscribe(result => {
      // console.log(`Dialog result: ${result}`);
    });
  }

}


// second componenet for modal
@Component({
  templateUrl: './success.html',
  styleUrls: ['./employee.component.css']
})

export class SuccessModal {

  constructor(
    public dialogRef: MatDialogRef<SuccessModal>,
    @Inject(MAT_DIALOG_DATA) public data: Employee) { }

  onNoClick(): void {
    this.dialogRef.close();
  }

}
