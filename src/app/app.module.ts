import {BrowserModule} from '@angular/platform-browser';
import {NgModule} from '@angular/core';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {AccueilComponent} from './accueil/accueil.component';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import {HttpClientModule} from '@angular/common/http';
import {StreamViewComponent} from './stream-view/stream-view.component';
import {StreamItemComponent} from './stream-item/stream-item.component';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatButtonModule, MatIconModule} from '@angular/material';


@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    StreamViewComponent,
    StreamItemComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
