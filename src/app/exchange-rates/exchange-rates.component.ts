import { Component, OnInit } from '@angular/core';
import { nav } from '../NavFillers';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import { StockService } from '../stock.service';
import { SYMBOL_DATA } from '../symbol-data';

@Component({
  selector: 'app-exchange-rates',
  templateUrl: './exchange-rates.component.html',
  styleUrls: ['./exchange-rates.component.scss']
})
export class ExchangeRatesComponent implements OnInit {

  fillerNav = nav;
  searched: boolean = false;
  currency = SYMBOL_DATA;
  converted: string;
  words: string;

  constructor(private router: Router,
    private authService: AuthService,
    private stockService: StockService) { }

  ngOnInit(): void {
  }

  goToFavs() {
    this.router.navigate(['/favorites']);
  }

  logout() {
    this.authService.logout();
  }

  //takes the value in usd inpputted by the user, and the currency they want to convert to
  fetchRates(value: string, currencyTo: any) {
    this.stockService.exchangeRate(currencyTo.symbol)
    .subscribe(rate => {
      setTimeout(() => {
        //turning strings into numbers to do math with and then rounding the numbers and turning it back into a string
        if(value >= 'A' && value <= 'Z' || value>='a' && value <= 'z') {
          this.words = "Please enter a valid number";
        } else {
          this.converted = (parseFloat(value) / parseFloat(rate["Realtime Currency Exchange Rate"]["5. Exchange Rate"].slice(0,-6))).toFixed(6);
          this.words = "$" + value + " USD = " + this.converted + " " + currencyTo.symbol;
        }
        this.searched = true; //shows the box with the results
      }, 1000);
    });
  }
}
