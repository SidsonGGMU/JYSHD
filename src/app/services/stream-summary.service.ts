import {Injectable} from '@angular/core';
import {criticalTemperature, MONTHS} from '../helpers/common';
import {Result, StreamSummary} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class StreamSummaryService {

  private genericValue = 10;

  constructor() {
  }

  generateStream(streamData: Result[] = []): StreamSummary[] {
    let blockInterval = 0;
    return MONTHS.map(currentMonth => {
      const tmpData = streamData.filter((value, index) => index >= blockInterval && index < blockInterval + 30);
      blockInterval = blockInterval + 30;
      return {
        month: currentMonth,
        data: tmpData,
        maxTemperature: this.maxTemperature(tmpData),
        minTemperature: this.minTemperature(tmpData),
        nbFire: this.nbFire(tmpData)
      };
    });
  }

  maxTemperature(streamData: Result[] = []) {
    const maxValue = streamData.reduce((previewValue, currentValue) =>
      currentValue.data.temperature > previewValue.data.temperature ? currentValue : previewValue)
      .data.temperature;
    return isNaN(maxValue) ? this.genericValue : maxValue;
  }

  minTemperature(streamData: Result[] = []) {
    const minValue = streamData.reduce((previewValue, currentValue) =>
      currentValue.data.temperature < previewValue.data.temperature ? currentValue : previewValue)
      .data.temperature;
    return isNaN(minValue) ? this.genericValue : minValue;
  }

  public nbFire(streamData: Result[] = []) {
    return streamData.filter(currentValue => currentValue.data.temperature > criticalTemperature).length;
  }

}
