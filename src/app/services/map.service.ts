import { Injectable } from '@angular/core';
import { MapComponent } from '../map/map.component';
import { Icon } from 'ol/style';

@Injectable({
  providedIn: 'root'
})
export class MapService {
  public refMap: MapComponent;
  public styleConfig = {
    normal: {
      image: new Icon(({
        color: '#FFFFFF',
        crossOrigin: 'anonymous',
        src: 'assets/ts-map-pin.svg',
        anchor: [0.5, 1],
        imgSize: [48, 48]
      }))},
    alert : {
      image: new Icon(({
        color: '#FA163F',
        crossOrigin: 'anonymous',
        src: 'assets/ts-map-pin.svg',
        anchor: [0.5, 1],
        imgSize: [48, 48]
      }))}
  };
  constructor() { }

}
