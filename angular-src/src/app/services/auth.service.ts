import { Injectable } from '@angular/core';
import { Http, Headers, RequestOptions } from '@angular/http';
import 'rxjs/add/operator/map';
import { tokenNotExpired } from 'angular2-jwt';
import { Course } from '../course'

@Injectable()
export class AuthService {
  authToken: any;
  student: any;
  courses: any;

  constructor(private http: Http) { }

  // Register user service
  registerUser(student){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // Sends data to our backend node server
    return this.http.post('students/signup', student, {headers: headers})
    .map(res => res.json());
  }

  // Authenticate user service
  authenticateUser(student){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // Sends data to our backend node server
    return this.http.post('students/signin', student, {headers: headers})
    .map(res => res.json());
  }

  // Get Profile
  getProfile(){
    let headers = new Headers();
    this.loadToken();

    // Authorization Header
    headers.append('Authorization', this.authToken);

    // Application/JSON Header
    headers.append('Content-Type', 'application/json');

    // Retrieves JSON information from server-side application (VIA NODE)
    return this.http.get('students/profile', {headers: headers})
    .map(res => res.json());
  }

  // Store user data
  storeUserData(token, student){
    localStorage.setItem('id_token', token);
    localStorage.setItem('user', JSON.stringify(student));
    this.authToken = token;
    this.student = student;
  }

  // Load token - fetch from localstorage
  loadToken(){
    const token = localStorage.getItem('id_token');
    this.authToken = token;
  }

  // Checks the token, if loggedin, will return token
  loggedIn(){
    return tokenNotExpired('id_token');
  }

  // Logout
  logout(){
    // Clears credentials
    this.authToken = null;
    this.student = null;
    localStorage.clear();
  }

  /* COURSES */

  // Register user service
  registerCourse(course){
    let headers = new Headers();
    headers.append('Content-Type', 'application/json');

    // Sends data to our backend node server
    return this.http.post('students/add_course', course, {headers: headers})
    .map(res => res.json());
  }

  // Get courses
  getCourses(){
    return this.http.get("students/courses")
    .map(courses => this.courses = courses.json())
  }

  
}
