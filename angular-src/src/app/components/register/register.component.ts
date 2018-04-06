import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../services/validate.service';
import { AuthService } from '../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  
  // Student fields
  studentNum: String;
  password: String;
  firstName: String;
  lastName: String;
  address: String;
  city: String;
  phoneNum: String;
  email: String;
  program: String;

  // When using a service, it must be injected into the constructor
  // These services are like methods you can use
  constructor(
    private validateService: ValidateService, 
    private flashMessage: FlashMessagesService,
    private authService: AuthService,
    private router: Router
  ) { }

  ngOnInit() {
  }

  onRegisterSubmit(){
    const student = {
      studentNum: this.studentNum,
      password: this.password,
      firstName: this.firstName,
      lastName: this.firstName,
      address: this.address,
      city: this.city,
      phoneNum: this.phoneNum,
      email: this.email,
      program: this.program
    }

    const err = [];

    // Required Fields
    if(!this.validateService.validateRegister(student)){
      if(!student.studentNum){
        err.push('STUDENT NUMBER')
      }
      if(!student.password){
        err.push('PASSWORD')
      }
      if(!student.firstName){
        err.push('FIRST NAME')
      }
      if(!student.lastName){
        err.push('LAST NAME')
      }
      if(!student.address){
        err.push('ADDRESS')
      }
      if(!student.city){
        err.push('CITY')
      }
      if(!student.email){
        err.push('EMAIL')
      }
      if(!student.phoneNum){
        err.push('PHONE NUMBER')
      }
      if(!student.program){
        err.push('PROGRAM')
      }

      this.flashMessage.show('Please fill in all fields: ' + err, {cssClass: 'alert-danger', timeout: 3000});
      return false;
    } 

    // Validate Email
    if(!this.validateService.validateEmail(student.email)){
      this.flashMessage.show('Please use a valid email', {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Register student
    this.authService.registerUser(student)
    .subscribe(data => {
      if(data.success){
        this.flashMessage.show('You are now registered.  You can now login.', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/login']);
      } else {
        this.flashMessage.show('Something went wrong.', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/register']);
      }
    });
  }

  
}
