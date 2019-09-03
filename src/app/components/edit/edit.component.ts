import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { EmployeeService } from '../../shared/employee.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Component({
  selector: 'app-edit',
  templateUrl: './edit.component.html',
  styleUrls: ['./edit.component.css']
})
export class EditComponent implements OnInit {
  public editForm: FormGroup;
  private id: string;
  constructor(private fb: FormBuilder, private actRoute: ActivatedRoute, private service: EmployeeService, private router: Router, private snackBar: MatSnackBar) {
    this.getEmployee(this.actRoute.snapshot.params['_id']);
    this.id = this.actRoute.snapshot.params['_id'];
    this.editForm = this.fb.group({
      name: ['', Validators.required],
      position: ['', Validators.required],
      office: ['', Validators.required],
      salary: ['', Validators.required]
    });

  }


  ngOnInit() { }
  getEmployee(id) {
    this.service.getEmployeeById(id).subscribe(data => {
      let result: any = {};
      result = data;
      this.id = result._id;
      this.editForm.setValue({
        name: result.name,
        position: result.position,
        office: result.office,
        salary: result.salary
      });
    });

  }



  // Update data to database
  submitForm(form: FormGroup) {
    let Data: any = this.editForm.value;
    Data._id = this.id;

    if (this.editForm.valid) {

      this.service.putEmployee(Data).subscribe((res) => {
        // console.log(res)
        let message = "Updated Successfully";
        let action = "Ok";
        this.snackBar.open(message, action, { duration: 2000, });
        setTimeout(() => {
          this.router.navigate(['/employeelist']);
        }, 2500);

      });

    }

  }
}
