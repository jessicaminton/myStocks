import { Component, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from '../../auth/auth.service';
import {MatTable, MatTableDataSource} from '@angular/material/table';
import { StockService } from '../stock.service';

export interface Favorites {
  coin: string;
};

const FAVS: Favorites[] = [];

@Component({
  selector: 'app-favorites',
  templateUrl: './favorites.component.html',
  styleUrls: ['./favorites.component.scss']
})
export class FavoritesComponent implements OnInit {

  name: string;
  storage: object;
  coins: any;
  favs = FAVS;
  dataSource = new MatTableDataSource<Favorites>(this.favs);
  displayedColumns: string[] = ['coins', 'button'];
  @ViewChild(MatTable) table: MatTable<any>;

  constructor(private router: Router,
    private authService: AuthService,
    private stockService: StockService) { }

  ngOnInit(): void {
    setTimeout(() => {
      this.name = this.authService.displayName;
    }, 1000);
    this.getCoins();
  }

  //navs back to dashboard with list of cryptos
  home() {
    this.router.navigate(['/dashboard']);
  }

  //logs user out
  logout() {
    this.authService.logout();
  }

  //gets the array of coins from firestore
  getCoins() {
    setTimeout(() => {
      this.coins = this.authService.coins;
      this.favs = []; //making this empty everytime to make sure we avoid adding duplicates to the same array
      console.log(this.coins);
      for(var i=0;i<this.coins[0][1].length; i++) {
        this.favs[i] = {coin: this.coins[0][1][i]};
      }
      this.table.renderRows(); //refreshes the table to show the accurate cryptos saved
    }, 1000 );
  }

  //lets the user view the details of the crypto selected
  viewDetails(sym:any) {
    this.stockService.setSymbol(sym.coin);
    this.router.navigate(['/details']);
  }


}
