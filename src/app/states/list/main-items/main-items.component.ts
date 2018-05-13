import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
import 'rxjs/add/operator/mergeMap';
import 'rxjs/add/operator/toArray';
import { Observable } from 'rxjs/Observable';

@Component({
  selector: 'app-main-items',
  templateUrl: './main-items.component.html',
  styleUrls: ['./main-items.component.scss']
})
export class MainItemsComponent implements OnInit {

  @Input() items: AngularFireList<any>
  @Input() selectedItem: any;
  @Output() selectedItemChange = new EventEmitter();

  newItemName: string;
  itemsObservable: Observable<any[]>;
  constructor() {

  }

  ngOnInit() {
    this.itemsObservable =
    this.items.snapshotChanges().map(changes => {
      return changes.map(c => ({
        key: c.payload.key ,
        name: c.payload.val().name,
        assigned: c.payload.val().assigned,
        records: c.payload.val().records
      }));
    });
  }

  select(item){
    this.selectedItem = item;
    this.selectedItemChange.emit(this.selectedItem);
  }

  addItem(){
    const item = {
      name: this.newItemName,
      assigned: false,
      records: []
    };

    this.items.push(item);
    this.newItemName = null;
  }

  removeItem(item){
    this.items.remove(item.key);
    this.select(null);
  }

  finishEditItem(item){
    delete item.editMode;
    const name = item.name;
    this.items.update(this.selectedItem.key, {name: name});
  }

  onKeyUp(event: any){
    if (event.keyCode === 13){
      this.addItem();
    }
  }

}
