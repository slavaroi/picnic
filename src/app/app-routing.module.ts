import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ListComponent } from './states/list/list.component';
import { MydetailsComponent } from './states/mydetails/mydetails.component';
import { PartysumComponent } from './states/partysum/partysum.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/list',
    pathMatch: 'full'
  },
  { path: 'list', component: ListComponent },
  { path: 'my', component: MydetailsComponent },
  { path: 'sum', component: PartysumComponent },
  { path: '**', redirectTo: '/list', pathMatch: 'full' }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
