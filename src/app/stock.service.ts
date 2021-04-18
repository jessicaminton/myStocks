import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  sym: string = '';
  httpOptions = {};

  constructor(private http: HttpClient) { }

  //takes the symbol of the crypto selected by the user
  setSymbol(symbol: string) {
    this.sym = symbol;
  }

  //gets the monthly values of the selected crypto
  //returns the fetched values
  getMonthly() {
    this.httpOptions = {
      params: {market: 'USD', function: 'DIGITAL_CURRENCY_MONTHLY', symbol: this.sym}, //required params, specifies that we're getting the monthly values
      headers: {
        'x-rapidapi-key': '5fdedbbef3mshec20e9f64ba028fp1e433cjsn7bf6a02686d0',
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
      }
    };
    let url = 'https://alpha-vantage.p.rapidapi.com/query';
     return this.http.get(url, this.httpOptions);
  }

  //same as monthly, just gets the daily values
  getDaily() {
    this.httpOptions = {
      params: {market: 'USD', function: 'DIGITAL_CURRENCY_DAILY', symbol: this.sym},
      headers: {
        'x-rapidapi-key': '5fdedbbef3mshec20e9f64ba028fp1e433cjsn7bf6a02686d0',
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
        'useQueryString': true
      }
    };
    let url = "https://alpha-vantage.p.rapidapi.com/query";
    return this.http.get(url, this.httpOptions);
  }

  //same as monthly, just gets the weekly values
  getWeekly() {
    this.httpOptions = {
      params: {market: 'USD', function: 'DIGITAL_CURRENCY_WEEKLY', symbol: this.sym},
      headers: {
        'x-rapidapi-key': '5fdedbbef3mshec20e9f64ba028fp1e433cjsn7bf6a02686d0',
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
        'useQueryString': true
      }
    };
    let url = "https://alpha-vantage.p.rapidapi.com/query";
    return this.http.get(url, this.httpOptions);
  }

  exchangeRate(toCurrency: string) {
    this.httpOptions = {
      params: {from_currency: toCurrency, function: 'CURRENCY_EXCHANGE_RATE', to_currency: 'USD'},
      headers: {
        'x-rapidapi-key': '5fdedbbef3mshec20e9f64ba028fp1e433cjsn7bf6a02686d0',
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
      }
    };
    let url = "https://alpha-vantage.p.rapidapi.com/query";
    return this.http.get(url, this.httpOptions);
  }
}
