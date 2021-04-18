import { Component, OnInit } from '@angular/core';
import {AuthService } from '../../auth/auth.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  emailError = new FormControl('', [Validators.required, Validators.email]); //makes sure the email entered is int he correct format
  hide = true; //used for show/hide password
  title = 'My Stocks';
  
  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  //registers the user and adds their email, password, and display name
  signup(email: string, password: string, username: string) {
    this.authService.register(email, password, username);
  }

  //returns the error message for the email and password
  getErrorMessage() {
    if (this.emailError.hasError('required')) {
      return 'You must enter a value';
    }
    return this.emailError.hasError('email') ? 'Not a valid email' : '';
  }

}
