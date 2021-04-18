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
  selectedValue: string;
  converted: string;
  symbol: string;

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

  fetchRates(value: string, currencyTo: any) {
    this.stockService.exchangeRate(currencyTo.symbol)
    .subscribe(rate => {
      setTimeout(() => {
        this.converted = (parseInt(value) / parseInt(rate["Realtime Currency Exchange Rate"]["5. Exchange Rate"].slice(0,-6))).toFixed(6);
        this.symbol = currencyTo.symbol;
        this.searched = true;
      }, 1000);
    });
    //this.searched = false;
    
  }
}
