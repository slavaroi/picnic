import { Component, OnInit } from '@angular/core';
import { AngularFireList, AngularFireDatabase } from 'angularfire2/database';
import { isArray } from 'util';

@Component({
  selector: 'app-partysum',
  templateUrl: './partysum.component.html',
  styleUrls: ['./partysum.component.scss']
})
export class PartysumComponent implements OnInit {

  itemsRef: AngularFireList<any>;
  result: any = {};
  constructor(private db: AngularFireDatabase) {
    this.itemsRef = db.list('items');
    this.itemsRef.valueChanges().subscribe((result: any[]) => {
      this.createResult(result);
    })
  }

  ngOnInit() {
  }

  createResult(items: any[]){
      for (const item of items) {
        if (!isArray(item.records)) {
          item.records = [];
        }

        for (const record of item.records) {
          if (!this.result[record.assigned]) {
            this.result[record.assigned] = 0;
          }

          this.result[record.assigned] += record.price;
        }
      }
  }

}
