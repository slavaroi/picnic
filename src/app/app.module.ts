import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule, MatButtonModule } from "@angular/material";
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppRoutingModule } from './app-routing.module';
import { ListComponent } from './states/list/list.component';
import { MainItemsComponent } from './states/list/main-items/main-items.component';
import { DetailsItemsComponent } from './states/list/details-items/details-items.component';
import { ListService } from './states/list/list.service';
import { UserService } from './shared/user.service';
import { MydetailsComponent } from './states/mydetails/mydetails.component';
import { PartysumComponent } from './states/partysum/partysum.component';
import { AddItemComponent } from './states/list/main-items/add-item/add-item.component';
import { environment } from '../environments/environment';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    MainItemsComponent,
    DetailsItemsComponent,
    MydetailsComponent,
    PartysumComponent,
    AddItemComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebase),
    AngularFireDatabaseModule,
    AngularFireAuthModule,
    MatInputModule,
    MatButtonModule,
    BrowserAnimationsModule
  ],
  providers: [ListService, UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
