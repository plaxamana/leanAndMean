import { Component, OnInit } from '@angular/core';
import { ValidateService } from '../../../services/validate.service';
import { AuthService } from '../../../services/auth.service';
import { FlashMessagesService } from 'angular2-flash-messages';
import { Router } from '@angular/router';
import { Course } from '../../../course';

@Component({
  selector: 'app-add-course',
  templateUrl: './add-course.component.html',
  styleUrls: ['./add-course.component.css']
})
export class AddCourseComponent implements OnInit {

  courseCode: String;
  courseName: String;
  section: String;
  semester: String;

  constructor(
    private validateService: ValidateService,
    private authService: AuthService,
    private flashMessage: FlashMessagesService,
    private router: Router
    ) { }

  ngOnInit() {
  }

  onCourseSubmit(){
    const course = {
      courseCode: this.courseCode,
      courseName: this.courseName,
      section: this.section,
      semester: this.semester
    }

    let error = [];
    if(!this.validateService.validateCourse(course)){
      if(!course.courseCode){
        error.push('COURSE CODE');
      }
      if(!course.courseName){
        error.push('COURSE NAME');
      }
      if(!course.section){
        error.push('SECTION');
      }
      if(!course.semester){
        error.push('SEMESTER');
      }

      this.flashMessage.show('Please fill in all fields: ' + error, {cssClass: 'alert-danger', timeout: 3000});
      return false;
    }

    // Add course
    this.authService.registerCourse(course)
    .subscribe(data => {
      if(data.success){
        this.flashMessage.show('The course has been added.', {cssClass: 'alert-success', timeout: 3000});
        this.router.navigate(['/dashboard']);
      } else {
        this.flashMessage.show('Something went wrong.', {cssClass: 'alert-danger', timeout: 3000});
        this.router.navigate(['/add_course']);
      }
    });
    
  } // onCourseSubmit() -- end
}
