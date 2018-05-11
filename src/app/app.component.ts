import { Component, OnInit } from '@angular/core';
import {  AngularFireDatabase, AngularFireList } from 'angularfire2/database'; 
import { Observable } from 'rxjs/Observable';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit{
  title = 'app';
  selectedItem: any = null;
  newItemName: string = null;
  showNewRecordForm: boolean = false;
  newRecordName: string = null;
  newRecordAmount: number = null;
  itemsRef: AngularFireList<any>;
  
  // items: Observable<any[]>;
  itemsObservable: Observable<any[]>;
  
  constructor(private db: AngularFireDatabase){
    this.itemsRef = db.list('items');
    // Use snapshotChanges().map() to store the key
    this.itemsObservable = this.itemsRef.snapshotChanges().map(changes => {
      return changes.map(c => ({ key: c.payload.key , name: c.payload.val().name, assigned: c.payload.val().assigned, records: c.payload.val().records}));
    });
  }

  select(item){
    this.selectedItem = item;
  }

  ngOnInit(){
    // this.itemsObservable = this.getItems();
  }

  addItem(){
    const item = {
      name: this.newItemName,
      assigned: false,
      records: ''
    };
    // this.items.push(item);

    this.itemsRef.push(item);
    this.newItemName = null;
  }

  removeItem(item){
    this.itemsRef.remove(item.key);
    this.select(null);
  }

  addRecord(){
    let records = this.selectedItem.records || {};
    const id = UUID.UUID();

    const record = {
      id: id,
      who: this.newRecordName,
      amount: this.newRecordAmount
    };

    records[id] = record;

    this.itemsRef.update(this.selectedItem.key, {records: records});
    
    //????????????
    if (Object.keys(records).length === 1){
      this.selectedItem.records = records;
    }
    
    this.newRecordName = null;
    this.newRecordAmount = null;
  }

  cancelAddRecord(){
    this.newRecordName = null;
    this.newRecordAmount = null;
    this.showNewRecordForm = false;
  }

  removeRecord(recordKey){
    // const index = this.selectedItem.records.indexOf(record);
    // this.selectedItem.records.splice(index, 1);

    let records = this.selectedItem.records;
    // const recordToRemove = records[recordKey];
    delete records[recordKey];
    this.itemsRef.update(this.selectedItem.key, {records: this.selectedItem.records});
  }

  getItems(): Observable<any[]> {
    return this.db.list("/items").valueChanges();
      // this.db.listref('users/' + userId).set({
      //   username: name,
      //   email: email,
      //   profile_picture : imageUrl
      // });

      // Get a reference to the database service
      // var database = firebase.database();
    
  }

  getKeys(obj){
    return obj ? Object.keys(obj) : [];
  }
}
