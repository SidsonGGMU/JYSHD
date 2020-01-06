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
import {MatButtonModule, MatIconModule, MatProgressSpinnerModule, MatExpansionModule, MatCardModule} from '@angular/material';
import { MapComponent } from './map/map.component';
import { RealTimeIconComponent } from './real-time-icon/real-time-icon.component';
import { FireIconComponent } from './fire-icon/fire-icon.component';
import { LoaderComponent } from './loader/loader.component';

@NgModule({
  declarations: [
    AppComponent,
    AccueilComponent,
    StreamViewComponent,
    StreamItemComponent,
    MapComponent,
    RealTimeIconComponent,
    FireIconComponent,
    LoaderComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    HttpClientModule,
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    MatCardModule,
    MatProgressSpinnerModule,
    MatExpansionModule,
    MatCardModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
