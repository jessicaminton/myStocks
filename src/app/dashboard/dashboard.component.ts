import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { StockService } from '../stock.service';
import { Router } from '@angular/router';
import { SYMBOL_DATA } from '../symbol-data';
import { Symbol } from '../symbol';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  fillerNav = ["Cryptocurrency", "Stocks"];
  storage: object = JSON.parse(localStorage.getItem("user"));
  username: string;
  displayedColumns: string[] = ['position', 'symbol', 'name', 'button'];
  dataSource = new MatTableDataSource<Symbol>(SYMBOL_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  data = SYMBOL_DATA;

  constructor(private authService: AuthService,
    private stockService: StockService,
    public router: Router) { }

  ngOnInit(): void {
    this.username = this.storage["displayName"];
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  logout() {
    this.authService.logout();
  }

  viewDetails(sym) {
    this.stockService.setSymbol(sym.symbol);
    this.router.navigate(['/details']);

  }

}
