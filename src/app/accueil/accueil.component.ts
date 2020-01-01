import {Component, OnInit} from '@angular/core';
import {DataserviceService} from '../services/dataservice.service';
import {DeviceGeoLocation, Result} from "../models/models";

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit {

  public deviceLocationData: DeviceGeoLocation[] = []
  public streamData: Result[] = []

  constructor(private dataService: DataserviceService) {
  }

  ngOnInit() {
    this.dataService.fetchData()
      .subscribe(data => {
        this.streamData = data.result;
      });

    this.dataService.fetchDeviceGeolocation()
      .subscribe(data => {
        this.deviceLocationData = data.result;
      });
  }

}
