import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Course } from '../../course';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {

  courses: Array<Course>;

  constructor(private authService: AuthService) { }

  ngOnInit() {
    this.authService.getCourses()
    .subscribe(res => this.courses = res);
  }

}
