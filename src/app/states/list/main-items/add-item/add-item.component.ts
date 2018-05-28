import { Component, OnInit, Input, EventEmitter, Output } from '@angular/core';

@Component({
  selector: 'app-add-item',
  templateUrl: './add-item.component.html',
  styleUrls: ['./add-item.component.scss']
})
export class AddItemComponent implements OnInit {

  value: string;

  @Output() onAdd = new EventEmitter();
  constructor() { }

  ngOnInit() {
  }

  onKeyUp(event: any){
    if (event.keyCode === 13){
      this.addItem();
    }
  }

  addItem(){
    this.onAdd.emit(this.value);
    this.value = '';
  }

}
