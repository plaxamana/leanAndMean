import { Injectable, Inject } from '@angular/core';
import { Router, CanActivate } from '@angular/router';
import { AuthService } from '../services/auth.service';

/* 
    This service allows you to protect your routes.
    If you're logged in, you'll be able to access the Dashboard
    and Profile components.
    If you're logged out, it will only redirect you to the login page,
    if you try to navigate manually via routes.    
*/

@Injectable()
export class AuthGuardService implements CanActivate{
    constructor(
        private authService: AuthService,
        private router: Router
    ){}

    canActivate(){
        // Check if you're logged in
        if(this.authService.loggedIn()){
            return true;
        } else {
            this.router.navigate(['/login']);
            return false;
        }
    }
}