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

  username: string;
  displayedColumns: string[] = ['position', 'symbol', 'name', 'button'];
  dataSource = new MatTableDataSource<Symbol>(SYMBOL_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;
  data = SYMBOL_DATA;
  symbols: string[] = [];

  constructor(private authService: AuthService,
    private stockService: StockService,
    public router: Router) { }

  ngOnInit() {
    setTimeout(() => {
      this.username = this.authService.displayName; //gets the display name from firebase
      this.authService.getCoins();
    }, 1000);
    
  }

  //runs after the ui has loaded
  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  //logs the user out
  logout() {
    this.authService.logout();
  }

  //function for the view button in the table
  //takes the value of the row clicked and passes it to the stock service
  viewDetails(sym:any) {
    this.stockService.setSymbol(sym.symbol);
    this.router.navigate(['/details']);

  }

  //this is for the search bar
  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  //navigates too favorites page
  goToFavs() {
    this.router.navigate(['/favorites']);
  }

}
