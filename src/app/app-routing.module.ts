import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { EmployeeComponent } from './components/employee/employee.component';
import { LoginComponent } from './components/login/login.component';
import { EditComponent } from './components/edit/edit.component';
import { StudentComponent } from './components/students/student/student.component';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  { path: 'employeelist', component: EmployeeComponent},
  { path: 'login', component: LoginComponent},
  {path: 'edit/:_id', component: EditComponent},
  { path: 'addstudent', component: StudentComponent},
  { path: 'addstudent:/_id', component: StudentComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
