import { Component, OnInit, Input, OnChanges, SimpleChange, SimpleChanges } from '@angular/core';
import { AngularFireList } from 'angularfire2/database';
import { UUID } from 'angular2-uuid';
import { UserService } from '../../../shared/user.service';
import { isArray } from 'util';
import { ListService } from '../list.service';

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
  constructor(private userService: UserService, private listService: ListService) { }

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

  removeRecord(record, index){
    //let foundIndex = this.selectedItem.records.findIndex(record => record.id == record.id);
    this.selectedItem.records.splice(index, 1);
    this.items.update(this.selectedItem.key, {records: this.selectedItem.records});
  }

  editRecord(record){
    record.editMode = true;
    record.original = {
      comment: record.comment,
      price: record.price
    };
  }

  cancelEdit(record){
    record.comment = record.original.comment;
    record.price = record.original.price;
    delete record.editMode;
    delete record.original;
  }

  saveRecord(record){
    delete record.editMode;
    delete record.original;
    this.items.update(this.selectedItem.key, {records: this.selectedItem.records});
  }

  get itemStatus(){
    return this.selectedItem.records && this.selectedItem.records.length ? this.selectedItem.finished ? this.listService.itemStatus['success'] :this.listService.itemStatus['warning'] : this.listService.itemStatus['danger'];
  }

  toggleItemFinished(){
    this.selectedItem.finished = !this.selectedItem.finished;
    this.items.update(this.selectedItem.key, {finished: this.selectedItem.finished });
  }

}
