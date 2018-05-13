import { Component, OnInit, Input } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-details-items',
  templateUrl: './details-items.component.html',
  styleUrls: ['./details-items.component.scss']
})
export class DetailsItemsComponent implements OnInit {

  @Input() selectedItem: any;
  @Input() items: AngularFireList<any>;

  newRecordName: string = null;
  newRecordAmount: number = null;
  showNewRecordForm: boolean = false;
  constructor() { }

  ngOnInit() {
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

    this.items.update(this.selectedItem.key, {records: records});

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
    let records = this.selectedItem.records;
    delete records[recordKey];
    this.items.update(this.selectedItem.key, {records: this.selectedItem.records});
  }

  getKeys(obj){
    return obj ? Object.keys(obj) : [];
  }



}
