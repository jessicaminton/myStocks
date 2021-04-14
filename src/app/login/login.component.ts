import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {FormControl, Validators} from '@angular/forms';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss']
})
export class LoginComponent implements OnInit {

  emailError = new FormControl('', [Validators.required, Validators.email]);
  hide = true;
  title = 'My Stocks';

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
  }

  login(email: string, password: string) {
    this.authService.login(email, password);
  }

  getErrorMessage() {
    if (this.emailError.hasError('required')) {
      return 'You must enter a value';
    }

    return this.emailError.hasError('email') ? 'Not a valid email' : '';
  }

}
