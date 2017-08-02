import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';

import { MyApp } from './app.component';
import { HomePage } from '../pages/home/home';
import { LoginPage } from "../pages/login/login";
import { SqlitePage } from "../pages/sqlite/sqlite";

//import { SqlitehelperProvider } from '../providers/sqlitehelper/sqlitehelper';
import { SQLite } from '@ionic-native/sqlite'

@NgModule({
  declarations: [
    MyApp,
    HomePage,
    LoginPage,
    SqlitePage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp)
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    HomePage,
    LoginPage,
    SqlitePage 
  ],
  providers: [
    StatusBar,
    SplashScreen,
    SQLite,
    {provide: ErrorHandler, useClass: IonicErrorHandler}
    //SqlitehelperProvider
  ]
})
export class AppModule {}
