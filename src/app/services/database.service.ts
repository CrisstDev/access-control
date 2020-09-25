import { Injectable } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from '@angular/fire/database';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class DatabaseService {
  
  constructor(private db: AngularFireDatabase) { }

  getData(){
    return this.db.list("/").snapshotChanges().pipe(
      map((changes) => {
        return changes.map((c: any) => ({
          $key: c.payload.key,
          ...c.payload.val(),
        }));
      })
    );
  }


  getRegistered(){
    return this.db.list("/assistants").snapshotChanges().pipe(
      map((changes) => {
        return changes.map((c: any) => ({
          $key: c.payload.key,
          ...c.payload.val(),
        }));
      })
    );
  }

  insertUser(user: { identification: number, license: string }){
    return this.db.list("/assistants").push(user);
  }


}
