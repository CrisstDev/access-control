import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  constructor(private db: AngularFireDatabase) { }

  getData(){
    return this.db.list("/").valueChanges();
  }


}
