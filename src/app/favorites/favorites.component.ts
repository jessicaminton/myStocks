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
      this.storage = JSON.parse(localStorage.getItem("user"));
      this.name = this.storage["displayName"];
    }, 1000);
    this.getCoins();
  }

  home() {
    this.router.navigate(['/dashboard']);
  }

  logout() {
    this.authService.logout();
  }

  getCoins() {
    setTimeout(() => {
      this.coins = this.authService.coins;
      for(var i=0;i<this.coins[0][1].length; i++) {
        this.favs[i] = {coin: this.coins[0][1][i]};
      }
      this.table.renderRows();
    }, 1000 );
  }

  viewDetails(sym) {
    this.stockService.setSymbol(sym.coin);
    this.router.navigate(['/details']);
  }


}
