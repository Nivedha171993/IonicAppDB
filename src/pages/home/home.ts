import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { LoginPage } from "../login/login"
import { SqlitePage } from "../sqlite/sqlite"


@Component({
  selector: 'page-home',
  templateUrl: 'home.html'
})
export class HomePage {

  constructor(public navCtrl: NavController) {

  }
  onLoadClick() {
    this.navCtrl.push(LoginPage);
    //alert("hello");
  }
  onLoadClick_sqlite() {
    this.navCtrl.push(SqlitePage);
  }
}
