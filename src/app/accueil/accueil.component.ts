import { Component, OnInit, OnDestroy } from '@angular/core';
import { DataserviceService } from '../services/dataservice.service';
import { Result, WeatherData, DeviceGeoLocation } from '../models/models';
import { Subscription } from 'rxjs';
import { ApixuService } from '../services/apixu.service';
import { criticalTemperature, fakeFidecObject } from '../helpers/common';
import { MapService } from '../services/map.service';

@Component({
  selector: 'app-accueil',
  templateUrl: './accueil.component.html',
  styleUrls: ['./accueil.component.scss']
})
export class AccueilComponent implements OnInit, OnDestroy {

  public streamData: Result;
  public weather: WeatherData;
  public deviceLocationData: DeviceGeoLocation;
  public isFire: boolean;
  private audio = new Audio('../../../assets/audio/the-purge-siren-sound-effect.mp3');
  private streamSubscription: Subscription;
  private deviceLocationSubscription: Subscription;
  private weatherSubscription: Subscription;
  public step = 0;
  public stoppedAudio: boolean;
  public fakeFidec: DeviceGeoLocation;

  constructor(private dataService: DataserviceService, private apixuService: ApixuService, private mapService: MapService) {
  }

  ngOnInit() {
    this.fakeFidec = fakeFidecObject;
    this.isFire = false;
    this.stoppedAudio = false;
    this.refresh();
    this.getWeather();
    this.getGeoLocation();
  }

  ngOnDestroy(): void {
    this.streamSubscription.unsubscribe();
    this.deviceLocationSubscription.unsubscribe();
    this.weatherSubscription.unsubscribe();
    this.stopAudio();
  }

  private getGeoLocation() {
    this.deviceLocationSubscription = this.dataService.fetchDeviceGeolocation()
      .subscribe(data => {
        this.deviceLocationData = data.result[0];
      });
  }

  private refresh() {
    this.streamSubscription = this.dataService.fetchLastData().subscribe((data) => {
      this.streamData = data.result[0];
      this.streamData.at = this.getTime(this.streamData.at);
      if (this.streamData.data.temperature > criticalTemperature) {
        this.isFire = true;
        this.playAudio();
      }
    });
    setInterval(() => {
      this.dataService.fetchLastData().subscribe((data) => {
        this.streamData = data.result[0];
        this.streamData.at = this.getTime(this.streamData.at);
        if (this.streamData.data.temperature > criticalTemperature) {
          if (!this.isFire) {
            this.isFire = true;
            this.playAudio();
          }
        } else {
          this.isFire = false;
          this.stopAudio();
        }
      });
    }, 20000);
  }

  private getTime(timeStamp: number) {
    const lastUpdate = new Date(timeStamp * 1000);
    const hours = lastUpdate.getHours() < 10 ? `0${lastUpdate.getHours()}` : lastUpdate.getHours();
    const minutes = lastUpdate.getMinutes() < 10 ? `0${lastUpdate.getMinutes()}` : lastUpdate.getMinutes();
    const seconds = lastUpdate.getSeconds() < 10 ? `0${lastUpdate.getSeconds()}` : lastUpdate.getSeconds();
    return `${hours}:${minutes}:${seconds}`;
  }

  private getWeather() {
    this.weatherSubscription = this.apixuService.getWeather().subscribe((weather: WeatherData) => {
      this.weather = weather;
    });
  }

  playAudio() {
    this.audio.load();
    this.audio.play();
  }

  stopAudio() {
    this.audio.pause();
  }
}
