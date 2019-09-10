import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { DemoMaterialModule } from '../app/materialModule';
import { HttpClientModule } from '@angular/common/http';
import { EmployeeComponent, SuccessModal } from './components/employee/employee.component';
import { EmployeeService } from './shared/employee.service';
import { ReactiveFormsModule, FormsModule} from '@angular/forms';
import { LoginComponent } from './components/login/login.component';
import { EditComponent } from './components/edit/edit.component';
import { StudentComponent, EditComponent2, StudentDelete ,} from './components/students/student/student.component';

@NgModule({
  declarations: [
    AppComponent,
    EmployeeComponent,
    SuccessModal,
    LoginComponent,
    EditComponent,
    StudentComponent,
    EditComponent2,
    StudentDelete

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    DemoMaterialModule,
    HttpClientModule,
    ReactiveFormsModule, FormsModule
  ],
  providers: [EmployeeService],
  bootstrap: [AppComponent],
  entryComponents:[
    SuccessModal,
    EditComponent2,
    StudentDelete
  ]
})
export class AppModule { }
