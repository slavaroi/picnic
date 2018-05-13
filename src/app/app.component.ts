import { Component, OnInit } from '@angular/core';
import {  AngularFireDatabase, AngularFireList } from 'angularfire2/database';
import { Observable } from 'rxjs/Observable';
import { UUID } from 'angular2-uuid';
import { UserService } from './shared/user.service';

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
}
