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
  
  
  

  ngOnInit() {
    this.savetoDB();
  }

  savetoDB() {
   
    this.stockService.getMonthly().subscribe(stock =>
      setTimeout(() => {
        this.stockData = stock;
        console.log(this.stockData);
        this.name = this.stockData["Meta Data"]["3. Digital Currency Name"];
        this.symbol = this.stockData["Meta Data"]["2. Digital Currency Code"];
        
        let arr = Object.entries(stock["Time Series (Digital Currency Monthly)"]);
        console.log(arr);
        for(var i = 0; i < 33; i++) {
          this.dates[i] = {date: arr[i][0], value: arr[i][1]["4b. close (USD)"]};
        }
        this.table.renderRows();
      }, 1000));
  
  }

  logout() {
    this.authService.logout();
  }

  goBack() {
    this.router.navigate(['/dashboard']);
  }

}
