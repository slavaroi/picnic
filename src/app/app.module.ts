import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppComponent } from './app.component';
import { FormsModule } from '@angular/forms';

import { environment } from '../app/environment';
import { AngularFireModule } from 'angularfire2';
import { AngularFireDatabaseModule } from 'angularfire2/database';
import { AngularFireAuthModule } from 'angularfire2/auth';
import { AppRoutingModule } from './app-routing.module';
import { ListComponent } from './states/list/list.component';
import { MainItemsComponent } from './states/list/main-items/main-items.component';
import { DetailsItemsComponent } from './states/list/details-items/details-items.component';
import { ListService } from './states/list/list.service';

@NgModule({
  declarations: [
    AppComponent,
    ListComponent,
    MainItemsComponent,
    DetailsItemsComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment),
    AngularFireDatabaseModule,
    AngularFireAuthModule
  ],
  providers: [ListService],
  bootstrap: [AppComponent]
})
export class AppModule { }
