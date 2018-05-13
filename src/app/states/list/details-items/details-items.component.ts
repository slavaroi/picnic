import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
import { UUID } from 'angular2-uuid';
import { UserService } from '../../../shared/user.service';
import { isArray } from 'util';

@Component({
  selector: 'app-details-items',
  templateUrl: './details-items.component.html',
  styleUrls: ['./details-items.component.scss']
})
export class DetailsItemsComponent implements OnInit, OnChanges {

  @Input() selectedItem: any;
  @Input() items: AngularFireList<any>;

  newRecordName: string = null;
  newRecordPrice: number = 0;
  showNewRecordForm: boolean = false;
  constructor(private userService: UserService) { }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges){
    if (changes["selectedItem"]) {
      if (!isArray(this.selectedItem.records)) {
        this.selectedItem.records = [];
      }
    }
  }

  addRecord(){
    if (!this.selectedItem.records) {
      this.selectedItem.records = [];
    }
    const id = UUID.UUID();

    const record = {
      id: id,
      comment: this.newRecordName,
      price: this.newRecordPrice,
      assigned: this.userService.name
    };

    this.selectedItem.records.push(record);

    this.items.update(this.selectedItem.key, {records: this.selectedItem.records});

    this.newRecordName = null;
    this.newRecordPrice = 0;
  }

  cancelAddRecord(){
    this.newRecordName = null;
    this.newRecordPrice = 0;
    this.showNewRecordForm = false;
  }

  removeRecord(recordKey){
    let foundIndex = this.selectedItem.records.findIndex(record => record.id == recordKey);
    this.selectedItem.records.splice(foundIndex, 1);
    this.items.update(this.selectedItem.key, {records: this.selectedItem.records});
  }

  // getKeys(obj){
  //   return obj ? Object.keys(obj) : [];
  // }



}
