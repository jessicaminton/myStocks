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

const DATA: Dates[] = [];

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

  name: string; //stores the name of the stock selected by the user
  symbol: string; //stores the symbol of the stock
  stockData: any; 
  dates = DATA;
  displayedColumns: string[] = ['date', 'value']; //columns for the table
  monthly: boolean;
  daily: boolean;
  weekly: boolean;
  icon: string = 'bookmark_add';
  coins: any;

  ngOnInit() {
    this.getDaily();
  }

  //logs the user out
  logout() {
    this.authService.logout();
  }

  //goes back to the main dashboard of all the cryptos
  goBack() {
    this.router.navigate(['/dashboard']);
  }

  //gets the daily values of the crypto selected by the user
  getDaily() {
    this.stockService.getDaily().subscribe(stock =>
      //timeout because it takes time for the api call and we want to make sure we have the data before we run any other functions
      setTimeout(() => {
        this.stockData = stock;
        console.log(this.stockData);
        this.name = this.stockData["Meta Data"]["3. Digital Currency Name"];
        this.symbol = this.stockData["Meta Data"]["2. Digital Currency Code"];
        this.getCoins(); //this is called so we can know if the user haas already saved this crypto or not
        let arr = Object.entries(stock["Time Series (Digital Currency Daily)"]); //turns the object into an array for easier parsing
        //visits the dates object space by space and adds in the date and value of the crypto
        //takes off 6 zeros from the end of the value idek why they needed 6 zeros
        for(var i = 0; i < 33; i++) {
          this.dates[i] = {date: arr[i][0], value: (arr[i][1]["4b. close (USD)"]).slice(0,-6)};
        }
        this.table.renderRows(); //updates the rows of the table
        //this changes the title to make sure it accurately tells the user which values they're viewing
        this.monthly = false; 
        this.weekly = false;
        this.daily = true;
      }, 1000));
  }

  //gets the monthly values of the crypto selected by the user
  //is the same as get daily is just references a different function is stock service that makes the api call for the
  //monthly values
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

  //gets the weekly values of the crypto
  //same as monthly and daily
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

  //this function lets the user add cryptos to their favorites
  favorite() {
    //it relies on the icon type to determine whether or not the crypto should be added
    if(this.icon === 'bookmark_add') {
      this.authService.addToFavs(this.symbol); //we don't have to worry about adding multiple of the same cryptos because firestore handles that
      this.icon = 'turned_in'; //changes the symbol to show that the user has it saved
    } else {
      this.authService.removeFromFavs(this.symbol);
      this.icon = 'bookmark_add'; //changes the symbol to show that the user can save the crypto
    }
  }

  //gets the array of saved coins from firestore
  //this is called on the page load so we can see if the user has already saved the crypto
  getCoins() {
    setTimeout(() => {
      this.coins = this.authService.coins;
      //goes through the array of coins
      for(let i = 0; i < this.coins[0][1].length;i++) {
        //if the curretn symbol is in the array, change the icon
        if(this.coins[0][1][i] === this.symbol) {
          this.icon = 'turned_in';
          break;
        } else {
          this.icon = 'bookmark_add';
        }
      }
    }, 1000);
  }
}
