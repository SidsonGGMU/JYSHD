import {Component, Input, OnInit} from '@angular/core';
import {Result} from '../models/models';

@Component({
  selector: 'app-stream-item',
  templateUrl: './stream-item.component.html',
  styleUrls: ['./stream-item.component.scss']
})
export class StreamItemComponent implements OnInit {

  @Input() month: string;
  @Input() result: Result[] = [];

  private criticalTemperature = 40;

  public nbFire = () => this.result.filter(currentValue => currentValue.data.temperature > this.criticalTemperature).length;

  constructor() { }

  ngOnInit() {
  }


  maxTemperature() {
    return this.result.reduce((previewValue, currentValue) =>
      currentValue.data.temperature > previewValue.data.temperature ? currentValue : previewValue)
      .data.temperature;
  }

  minTemperature() {
    return this.result.reduce((previewValue, currentValue) =>
      currentValue.data.temperature < previewValue.data.temperature ? currentValue : previewValue)
      .data.temperature;
  }

}
