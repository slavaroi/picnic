import { Component, OnInit } from '@angular/core';
import { AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { UserService } from '../../shared/user.service';
import { isArray } from 'util';

@Component({
  selector: 'app-mydetails',
  templateUrl: './mydetails.component.html',
  styleUrls: ['./mydetails.component.scss']
})
export class MydetailsComponent implements OnInit {

  itemsRef: AngularFireList<any>;
  result: any[] = [];
  constructor(private db: AngularFireDatabase, private userService: UserService) {
    this.itemsRef = db.list('items');
    this.itemsRef.valueChanges().subscribe((result: any[]) => {
      this.createResult(result);
    })
  }

  ngOnInit() {


  }

  createResult(items: any[]){
    this.result = [];
      for (const item of items) {
        if (!isArray(item.records)) {
          item.records = [];
        }

        for (const record of item.records) {
          if (record.assigned == this.userService.name) {
            this.result.push({
              name: item.name,
              comment: record.comment,
              price: record.price
            })
          }
        }
      }
  }

}
