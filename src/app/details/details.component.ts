import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { StockService } from '../stock.service';
import { Router } from '@angular/router';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/switchMap';
import { Stock } from '../stocks';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { AuthService } from 'src/auth/auth.service';

export interface Dates {
  date: string;
  value: string;
};

const DATA: Dates[] = [
  
];

@Component({
  selector: 'app-details',
  templateUrl: './details.component.html',
  styleUrls: ['./details.component.scss']
})
export class DetailsComponent implements OnInit {

  stock: Stock;
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private stockService: StockService,
    private router: Router,
    private authService: AuthService) { }
  name: string;
  symbol: string;
  stockData: any;
  dates = DATA;
  dataSource = new MatTableDataSource<Dates>(this.dates);
  displayedColumns: string[] = ['date', 'value'];
  monthly: boolean;
  daily: boolean;
  weekly: boolean;
  health: string;
  icon: string = 'bookmark_add';
  coins: any;

  ngOnInit() {
    this.getDaily();
  }

  logout() {
    this.authService.logout();
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

  getDaily() {
    this.stockService.getDaily().subscribe(stock =>
      setTimeout(() => {
        this.stockData = stock;
        console.log(this.stockData);
        this.name = this.stockData["Meta Data"]["3. Digital Currency Name"];
        this.symbol = this.stockData["Meta Data"]["2. Digital Currency Code"];
        this.getCoins();
        let arr = Object.entries(stock["Time Series (Digital Currency Daily)"]);
        for(var i = 0; i < 33; i++) {
          this.dates[i] = {date: arr[i][0], value: (arr[i][1]["4b. close (USD)"]).slice(0,-6)};
        }
        this.table.renderRows();
        this.monthly = false;
        this.weekly = false;
        this.daily = true;
      }, 1000));
  }

  getMonthly() {
    this.stockService.getMonthly().subscribe(stock =>
      setTimeout(() => {
        this.stockData = stock;
        console.log(this.stockData);
        this.name = this.stockData["Meta Data"]["3. Digital Currency Name"];
        this.symbol = this.stockData["Meta Data"]["2. Digital Currency Code"];
        
        let arr = Object.entries(stock["Time Series (Digital Currency Monthly)"]);
        for(var i = 0; i < 33; i++) {
          this.dates[i] = {date: arr[i][0], value: (arr[i][1]["4b. close (USD)"]).slice(0,-6)};
        }
        this.table.renderRows();
        this.daily = false;
        this.weekly = false;
        this.monthly = true;
      }, 1000));
  }

  getWeekly() {
    this.stockService.getWeekly().subscribe(stock =>
      setTimeout(() => {
        this.stockData = stock;
        console.log(this.stockData);
        this.name = this.stockData["Meta Data"]["3. Digital Currency Name"];
        this.symbol = this.stockData["Meta Data"]["2. Digital Currency Code"];
        
        let arr = Object.entries(stock["Time Series (Digital Currency Weekly)"]);
        for(var i = 0; i < 33; i++) {
          this.dates[i] = {date: arr[i][0], value: (arr[i][1]["4b. close (USD)"]).slice(0,-6)};
        }
        this.table.renderRows();
        this.daily = false;
        this.monthly = false;
        this.weekly = true;
      }, 1000));
  }

  favorite() {
    if(this.icon === 'bookmark_add') {
      this.authService.addToFavs(this.symbol);
      this.icon = 'turned_in';
    } else {
      this.authService.removeFromFavs(this.symbol);
      this.icon = 'bookmark_add';
    }
  }

  getCoins() {
    setTimeout(() => {
      this.coins = this.authService.coins;
      for(let i = 0; i < this.coins[0][1].length;i++) {
        if(this.coins[0][1][i] === this.symbol) {
          this.icon = 'turned_in';
          break;
        } else {
          this.icon = 'bookmark_add';
        }
      }
    }, 1000);
  }

  goToFavs() {
    this.router.navigate(['/favorites']);
  }

}
