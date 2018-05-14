import { Component, OnInit } from '@angular/core';
import {  AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { UserService } from './shared/user.service';
import { UUID } from 'angular2-uuid';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {

  constructor(private db: AngularFireDatabase, private userService: UserService){
  }

  ngOnInit(){
  }

  get name(){
    return this.userService.name;
  }

  changeName(){
    this.userService.changeName();
  }
}
