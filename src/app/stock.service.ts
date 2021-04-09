import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class StockService {

  sym: string = '';
  httpOptions = {};

  constructor(private http: HttpClient) { }

  setSymbol(symbol: string) {
    this.sym = symbol;
  }

  getMonthly() {
    this.httpOptions = {
      params: {market: 'USD', function: 'DIGITAL_CURRENCY_MONTHLY', symbol: this.sym},
      headers: {
        'x-rapidapi-key': '5fdedbbef3mshec20e9f64ba028fp1e433cjsn7bf6a02686d0',
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com'
      }
    };
    let url = 'https://alpha-vantage.p.rapidapi.com/query';
     return this.http.get(url, this.httpOptions);
  }

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

  getHealth() {
    this.httpOptions = {
      params: {market: 'USD', function: 'CRYPTO_RATING', symbol: 'BTC'},
      headers: {
        'x-rapidapi-key': '5fdedbbef3mshec20e9f64ba028fp1e433cjsn7bf6a02686d0',
        'x-rapidapi-host': 'alpha-vantage.p.rapidapi.com',
        'useQueryString': true
      }
    };
    let url = "https://alpha-vantage.p.rapidapi.com/query";
    return this.http.get(url, this.httpOptions);
  }
}
