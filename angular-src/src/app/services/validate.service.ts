import { Injectable } from '@angular/core';

@Injectable()
export class ValidateService {

  constructor() { }

  validateRegister(student){
    if(student.firstName == undefined || student.lastName == undefined || student.studentNum == undefined || 
      student.password == undefined || student.address == undefined || student.city == undefined ||
      student.phoneNum == undefined || student.email == undefined || student.program == undefined){
      return false;
    } else {
      return true;
    }
  }

  validateCourse(course){
    if(course.courseCode == undefined || course.courseName == undefined ||
       course.section == undefined || course.semester == undefined ){
         return false;
       } else {
         return true;
       }
  }

  validateEmail(email){
    const re = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
    return re.test(email);
  }
}
