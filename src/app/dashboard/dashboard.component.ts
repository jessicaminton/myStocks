import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../auth/auth.service';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  fillerNav = ["Cryptocurrency", "Stocks"];
  username: string;

  constructor(private authService: AuthService) { }

  ngOnInit(): void {
    this.username = this.authService.displayName;
  }

  logout() {
    this.authService.logout();
  }

}
