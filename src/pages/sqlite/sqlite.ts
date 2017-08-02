import { Component } from '@angular/core';
import { NavController, NavParams } from 'ionic-angular';

import { SQLite, SQLiteObject } from '@ionic-native/sqlite';

const DATABASE_FILE_NAME: string='data.db';

/**
 * Generated class for the SqlitePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */

@Component({
  selector: 'page-sqlite',
  templateUrl: 'sqlite.html',
})
export class SqlitePage {

  private db: SQLiteObject;
  movies:string[]=[];
  titleMovie:string;
  ratingMovie:number;
  descriptionMovie: string;
  categorieMovie:string;

  constructor(public navCtrl: NavController, public navParams: NavParams,private sqlite: SQLite) {
    this.createDatabaseFile();
  }

  ionViewDidLoad() {
    console.log('ionViewDidLoad SqlitePage');
  }

  private createDatabaseFile(): void {
    this.sqlite.create({
      name: DATABASE_FILE_NAME,
      location: 'default'
    })
      .then((db: SQLiteObject) => {
        console.log('Database Created');
        this.db=db;
        this.createTables();
      })
      .catch(e => console.log(e));

  }

  private createTables(): void{
      this.db.executeSql('CREATE TABLE IF NOT EXISTS `MOVIES` ( `idMovies` INTEGER NOT NULL, `name` TEXT NOT NULL, `eval` INTEGER NOT NULL DEFAULT 3, `desc` TEXT NOT NULL, `CategoryId` INTEGER, PRIMARY KEY(`idMovies`), FOREIGN KEY(`CategoryId`) REFERENCES idCategories )', {})
        .then(() => {
          console.log('Table Movies created');
          this.db.executeSql('CREATE TABLE IF NOT EXISTS `CATEGORIES` ( `idCategories` INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT, `name` TEXT )', {})
            .then(() => console.log('Executed SQL'))
            .catch(e => console.log(e));
        })
        .catch(e => console.log(e));
  }

  public saveMyFilm(){
    console.log('Movie name ->'+this.titleMovie);
    console.log('Rating ->'+this.ratingMovie+'/5');
    console.log('Description ->'+this.descriptionMovie);
    console.log('Categorie ->'+this.categorieMovie);


   // insert into `CATEGORIES` (name) Values ('Test');
   //insert into `MOVIES` (name,eval,desc, categoryId) Values ('asdf',3,'description',1);
    this.db.executeSql('insert into `CATEGORIES` (name) Values (\''+ this.categorieMovie +'\')', {})
      .then(() => {
        console.log('Categorie inserted');
        this.db.executeSql('insert into `MOVIES` (name,eval,desc, categoryId) Values (\''+ this.titleMovie +'\','+ this.ratingMovie +',\''+ this.descriptionMovie +'\', last_insert_rowid())', {})
          .then(() => console.log('Movie Inserted'))
          .catch(e => console.log(e));
      })
      .catch(e => console.log(e));   
  }

  public retrieveFilms(){
    this.movies=[];
    this.db.executeSql('select name from `MOVIES`',{})
    .then((data)=>{
      if(data==null)
      {
        return;
      }
      if(data.rows){
        if(data.rows.length>0){
            for(var i=0;i<data.rows.length;i++){
              this.movies.push(data.rows.item(i));
            }
        }
      }
    });
  }

}
