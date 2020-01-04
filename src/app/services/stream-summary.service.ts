import {Injectable} from '@angular/core';
import {criticalTemperature, genericValue, MONTHS} from '../helpers/common';
import {Result, StreamSummary} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class StreamSummaryService {

  constructor() {
  }

  generateStream(streamData: Result[] = []): StreamSummary[] {
    let blockInterval = 0;
    return MONTHS.map(currentMonth => {
      let tmpData = streamData.filter((value, index) => index >= blockInterval && index < blockInterval + 30);
      tmpData = this.rebuildTemperature(tmpData);
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
    return streamData.reduce((previewValue, currentValue) =>
      currentValue.data.temperature > previewValue.data.temperature ? currentValue : previewValue)
      .data.temperature;
  }

  minTemperature(streamData: Result[] = []) {
    return streamData.reduce((previewValue, currentValue) =>
      currentValue.data.temperature < previewValue.data.temperature ? currentValue : previewValue)
      .data.temperature;
  }

  public nbFire(streamData: Result[] = []) {
    return streamData.filter(currentValue => currentValue.data.temperature > criticalTemperature).length;
  }

  private rebuildTemperature(data: Result[] = []) {
    return data.map(item => {
      if (isNaN(item.data.temperature)) {
        item.data.temperature = genericValue;
      }
      return item;
    });
  }

}
