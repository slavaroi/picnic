import { Component, OnInit } from '@angular/core';
import { ListService } from './list.service';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss']
})
export class ListComponent implements OnInit {

  itemsRef: AngularFireList<any>;
  selectedItem: any;
  constructor(private listService: ListService, private db: AngularFireDatabase) {
    this.itemsRef = db.list('items');
   }

  ngOnInit() {
  }

}
