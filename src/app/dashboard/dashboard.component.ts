import { Component, OnInit, ViewChild } from '@angular/core';
import { AuthService } from '../../auth/auth.service';
import {MatPaginator} from '@angular/material/paginator';
import {MatTableDataSource} from '@angular/material/table';
import { StockService } from '../stock.service';
import { Router } from '@angular/router';

export interface PeriodicElement {
  name: string;
  position: number;
  symbol: string;
}

const ELEMENT_DATA: PeriodicElement[] = [

  {position: 1, symbol: 'BTC', name: 'Bitcoin'},
{position: 2, symbol: 'ETH', name: 'Ethereum'}, 
{position: 3, symbol: 'USDT', name:	'Tether'},
{position: 4, symbol: 'DOT', name:	'Polkadot'},
{position: 5, symbol: 'XRP', name:	'XRP'},
{position: 6, symbol: 'ADA', name:	'Cardano'},
{position: 7, symbol: 'LTC', name:	'Litecoin'},
{position: 8, symbol: 'BCH', name:	'Bitcoin Cash'},
{position: 9, symbol: 'LINK', name:	'Chainlink'},
{position: 10, symbol: 'XLM', name:	'Stellar'},
{position: 11, symbol: 'BNB', name:	'Binance Coin'},
{position: 12, symbol: 'USDC', name:	'USD Coin'},
{position: 13, symbol: 'WBTC', name:	'Wrapped Bitcoin'},
{position: 14, symbol: 'BSV', name:	'Bitcoin SV'},
{position: 15, symbol: 'XMR', name:	'Monero'},
{position: 16, symbol: 'EOS', name:	'EOS'},
{position: 17, symbol: 'UNI', name:	'Uniswap'},
{position: 18, symbol: 'AAVE', name:	'Aave'},
{position: 19, symbol: 'XTZ', name:	'Tezos'},
{position: 20, symbol: 'TRX', name:	'TRON'},
{position: 21, symbol: 'THETA', name:	'THETA'},
{position: 22, symbol: 'XEM', name:	'NEM'},
{position: 23, symbol: 'CRO', name:	'Crypto.com Coin'},
{position: 24, symbol: 'ATOM', name:	'Cosmos'},
{position: 25, symbol: 'SNX', name:	'Synthetix'},
{position: 26, symbol: 'VET', name:	'VeChain'},
{position: 27, symbol: 'NEO', name:	'Neo'},
{position: 28, symbol: 'MKR', name:	'Maker'},
{position: 29, symbol: 'DAI', name:	'Dai'},
{position: 30, symbol: 'LEO', name:	'UNUS SED LEO'},
{position: 31, symbol: 'DASH', name:	'Dash'},
{position: 32, symbol: 'DOGE', name:	'Dogecoin'},
{position: 33, symbol: 'MIOTA', name:	'IOTA'},
{position: 34, symbol: 'ZEC', name:	'Zcash'},
{position: 35, symbol: 'BUSD', name:	'Binance USD'},
{position: 36, symbol: 'CEL', name: 'Celsius'},
{position: 37, symbol: 'FIL', name:	'Filecoin'},
{position: 38, symbol: 'AVAX', name:	'Avalanche'},
{position: 39, symbol: 'YFI', name:	'yearn.finance'},
{position: 40, symbol: 'HT', name:	'Huobi Token'},
{position: 41, symbol: 'REV', name:	'Revain'},
{position: 42, symbol: 'SUSHI', name:	'SushiSwap'},
{position: 43, symbol: 'COMP', name:	'Compound'},
{position: 44, symbol: 'SOL', name:	'Solana'},
{position: 45, symbol: 'ETC', name:	'Ethereum Classic'},
{position: 46, symbol: 'FTT', name:	'FTX Token'},
{position: 47, symbol: 'KSM', name:	'Kusama'},
{position: 48, symbol: 'ZIL', name:	'Zilliqa'},
{position: 49, symbol: 'DCR', name:	'Decred'},
{position: 50, symbol: 'WAVES', name:	'Waves'},
{position: 51, symbol: 'HEDG', name:	'HedgeTrade'},
{position: 52, symbol: 'ALGO', name:	'Algorand'},
{position: 53, symbol: 'EGLD', name:	'Elrond'},
{position: 54, symbol: 'UMA', name:	'UMA'},
{position: 55, symbol: 'GRT', name:	'The Graph'},
{position: 56, symbol: 'REN', name:	'Ren'},
{position: 57, symbol: 'ONT', name:	'Ontology'},
{position: 58, symbol: 'NEAR', name:	'NEAR Protocol'},
{position: 59, symbol: 'OMG', name:	'OMG Network'},
{position: 60, symbol: 'LRC', name:	'Loopring'},
{position: 61, symbol: 'RENBTC', name:	'renBTC'},
{position: 62, symbol: 'NANO', name:	'Nano'},
{position: 63, symbol: 'ZRX', name:	'0x'},
{position: 64, symbol: 'BAT', name:	'Basic Attention Token'},
{position: 65, symbol: 'HBAR', name:	'Hedera Hashgraph'},
{position: 66, symbol: 'ICX', name:	'ICON'},
{position: 67, symbol: 'TUSD', name:	'TrueUSD'},
{position: 68, symbol: 'DGB', name:	'DigiByte'},
{position: 69, symbol: 'OKB', name:	'OKB'},
{position: 70, symbol: 'RSR', name:	'Reserve Rights'},
{position: 71, symbol: 'LUNA', name:	'Terra'},
{position: 72, symbol: 'NEXO', name:	'Nexo'},
{position: 73, symbol: 'STX', name:	'Stacks'},
{position: 74, symbol: 'BTT', name:	'BitTorrent'},
{position: 75, symbol: 'RUNE', name:	'THORChain'},
{position: 76, symbol: 'QTUM', name:	'Qtum'},
{position: 77, symbol: 'IOST', name:	'IOST'},
{position: 78, symbol: 'CHSB', name:	'SwissBorg'},
{position: 79, symbol: 'HUSD', name:	'HUSD'},
{position: 80, symbol: 'CRV', name:	'Curve DAO Token'},
{position: 81, symbol: 'EWT', name:	'Energy Web Token'},
{position: 82, symbol: 'CELO', name:	'Celo'},
{position: 83, symbol: 'ZEN', name:	'Horizen'},
{position: 84, symbol: 'BTCB', name:	'Bitcoin BEP2'},
{position: 85, symbol: 'VGX', name:	'Voyager Token'},
{position: 86, symbol: 'PAX', name:	'Paxos Standard'},
{position: 87, symbol: 'KNC', name:	'Kyber Network'},
{position: 88, symbol: 'QNT', name:	'Quant'},
{position: 89, symbol: 'OCEAN', name:	'Ocean Protocol'},
{position: 90, symbol: 'XVG', name:	'Verge'},
{position: 91, symbol: 'BTG', name:	'Bitcoin Gold'},
{position: 92, symbol: 'SC', name:	'Siacoin'},
{position: 93, symbol: 'REP', name:	'Augur'},
{position: 94, symbol: 'BAND', name:	'Band Protocol'},
{position: 95, symbol: 'NXM', name:	'NXM'},
{position: 96, symbol: 'ABBC', name:	'ABBC Coin'},
{position: 97, symbol: 'ENJ', name:	'Enjin Coin'},
{position: 98, symbol: 'UST', name:	'TerraUSD'},
{position: 99, symbol: 'SNT', name:	'Status'}
];

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {

  fillerNav = ["Cryptocurrency", "Stocks"];
  storage: object = JSON.parse(localStorage.getItem("user"));
  username: string;
  displayedColumns: string[] = ['position', 'symbol', 'name', 'button'];
  dataSource = new MatTableDataSource<PeriodicElement>(ELEMENT_DATA);
  @ViewChild(MatPaginator) paginator: MatPaginator;

  constructor(private authService: AuthService,
    private stockService: StockService,
    public router: Router) { }

  ngOnInit(): void {
    this.username = this.storage["displayName"];
    
  }

  ngAfterViewInit(): void {
    this.dataSource.paginator = this.paginator;
  }

  logout() {
    this.authService.logout();
  }

  viewDetails(sym) {
    this.stockService.setSymbol(sym.symbol);
    this.router.navigate(['/details']);

  }

}
