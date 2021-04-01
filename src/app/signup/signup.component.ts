import { Component, OnInit } from '@angular/core';
import {AuthService } from '../../auth/auth.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  emailError = new FormControl('', [Validators.required, Validators.email]);
  hide = true;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  signup(email: string, password: string) {
    this.authService.register(email, password);
  }

  getErrorMessage() {
    if (this.emailError.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailError.hasError('email') ? 'Not a valid email' : '';
  }

}
