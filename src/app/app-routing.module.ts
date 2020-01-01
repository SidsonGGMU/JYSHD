import {NgModule} from '@angular/core';
import {RouterModule, Routes} from '@angular/router';
import {AccueilComponent} from './accueil/accueil.component';
import {StreamViewComponent} from './stream-view/stream-view.component';


const routes: Routes = [
  {path: 'home', component: AccueilComponent},
  {path: 'StreamViewComponent', component: StreamViewComponent},
  {path: '', redirectTo: 'home', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
