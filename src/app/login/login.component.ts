import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailError = new FormControl('', [Validators.required, Validators.email]); //makes sure the email is in the correct form
  hide = true; //used for the hide/view password
  title = 'My Stocks';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  //logs the user in with their username and password
  login(email: string, password: string) {
    this.authService.login(email, password);
  }

  //returns the error message for the email and password
  getErrorMessage() {
    if (this.emailError.hasError('required')) {
      return 'You must enter a value';
    }
    return this.emailError.hasError('email') ? 'Not a valid email' : '';
  }

}
