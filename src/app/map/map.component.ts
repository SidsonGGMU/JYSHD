import { Component, OnInit, OnDestroy } from '@angular/core';
import { DeviceGeoLocation } from '../models/models';
import { DataserviceService } from '../services/dataservice.service';
import { Subscription } from 'rxjs';
import { Map, View, Feature } from 'ol';
import { Tile as TileLayer, Vector as VectorLayer } from 'ol/layer.js';
import VectorSource from 'ol/source/Vector';
import XYZ from 'ol/source/XYZ';
import { Coordinate } from 'ol/coordinate';
import OSM from 'ol/source/OSM';
import * as proj from 'ol/proj.js';
import Point from 'ol/geom/Point';
import { Icon, Style } from 'ol/style';
import { fakeFidecObject } from '../helpers/common';
import Overlay from 'ol/Overlay';


@Component({
  selector: 'app-map',
  templateUrl: './map.component.html',
  styleUrls: ['./map.component.scss']
})
export class MapComponent implements OnInit, OnDestroy {
  map: Map;
  view: View;
  sourcePoints: VectorSource;
  styleCache = {};
  layerPoint: VectorLayer;
  public deviceLocationData: DeviceGeoLocation[] = [];
  private deviceLocationSubscription: Subscription;
  options = { zoom: 16 };
  currentCenter: Coordinate;
  private urlCarto = 'http://a.tile.openstreetmap.fr/hot/';

  constructor(private dataService: DataserviceService) { }

  ngOnInit() {
    this.sourcePoints = new VectorSource({});
    this.getGeoLocation();
  }

  ngOnDestroy() {
    this.deviceLocationSubscription.unsubscribe();
  }

  private getGeoLocation() {
    this.deviceLocationSubscription = this.dataService.fetchDeviceGeolocation()
      .subscribe(data => {
        this.deviceLocationData = data.result;
        this.initMap();
      });
  }

  initializeMap() {
    const xyzLayer = new TileLayer({
      source: new XYZ({
        maxZoom: 18,
        minZoom: 10,
        url: this.urlCarto + '/{z}/{x}/{y}.png',
        attributions: [
          `Tiles courtesy of <a href="https://www.jawg.io" target="_blank" rel="noopener">jawgmaps</a>
          - Map data <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">©OpenStreetMap contributors</a>,
          under ODbL.`
        ],
      })
    });
    this.view = new View({
      zoom: this.options.zoom,
      maxZoom: 19,
      minZoom: 10
    });
    this.map = new Map({
      target: 'map',
      layers: [xyzLayer],
      view: this.view,
    });
    return this.map;
  }

  initMap() {
    const container = document.getElementById('popup');
    const content = document.getElementById('popup-content');
    const closer = document.getElementById('popup-closer');
    const overlay = new Overlay({
      element: container,
      autoPan: true,
      autoPanAnimation: {
        duration: 250
      }
    });

    const styleCache = `style_${this.deviceLocationData[0].name}`;
    const fidecObject = new Feature({
      properties: { ...this.deviceLocationData[0] },
      geometry: new Point(this.projCarte([this.deviceLocationData[0].lon, this.deviceLocationData[0].lat]))
    });
    fidecObject.setStyle(new Style({
      image: new Icon(({
        color: '#FFFFFF',
        crossOrigin: 'anonymous',
        src: 'assets/ts-map-pin.svg',
        anchor: [0.5, 1],
        imgSize: [48, 48]
      }))
    }));
    const fakeFidecFeature = new Feature({
      properties: { ...fakeFidecObject },
      geometry: new Point(this.projCarte([fakeFidecObject.lon, fakeFidecObject.lat]))
    });
    fakeFidecFeature.setStyle(new Style({
      image: new Icon(({
        color: '#FFFFFF',
        crossOrigin: 'anonymous',
        src: 'assets/ts-map-pin.svg',
        anchor: [0.5, 1],
        imgSize: [48, 48]
      }))
    }));
    this.sourcePoints.addFeatures([fidecObject, fakeFidecFeature]);

    this.layerPoint = new VectorLayer({
      source: this.sourcePoints
    });

    this.map = new Map({
      target: 'map',
      layers: [
        new TileLayer({
          source: new XYZ({
            url: this.urlCarto + '/{z}/{x}/{y}.png',
            attributions: [
              `Tiles courtesy of <a href="https://www.jawg.io" target="_blank" rel="noopener">jawgmaps</a>
          - Map data <a href="https://www.openstreetmap.org/copyright" target="_blank" rel="noopener">©OpenStreetMap contributors</a>,
          under ODbL.`
            ],
          })
        }),
        this.layerPoint
      ],
      overlays: [overlay],
      view: new View({
        center: this.projCarte([5.724524, 45.188529]),
        zoom: this.options.zoom
      })
    });

  }

  projCarte(coord: Coordinate) {
    return proj.transform(coord, 'EPSG:4326', 'EPSG:3857');
  }

  createLayerFidec() {
    this.map.addLayer(this.layerPoint);
  }
}
