import {Injectable} from '@angular/core';
import {criticalTemperature, divisor, genericValue, MONTHS} from '../helpers/common';
import {Result, StreamSummary} from '../models/models';

@Injectable({
  providedIn: 'root'
})
export class StreamSummaryService {

  constructor() {
  }

  generateStream(streamData: Result[] = []): StreamSummary[] {
    divisor.value = Math.trunc(streamData.length / 12);
    let lastIndex = 0;
    let blockInterval = 0;
    const tmpStreamSummaries = MONTHS.map(currentMonth => {
      let tmpData = streamData.filter((value, index) => {
        if (index >= blockInterval && index < blockInterval + divisor.value) {
          lastIndex = index;
          return true;
        }
        return false;
      });
      blockInterval = blockInterval + divisor.value;
      tmpData = this.rebuildTemperature(tmpData);
      return {
        month: currentMonth,
        data: tmpData,
        maxTemperature: this.maxTemperature(tmpData),
        minTemperature: this.minTemperature(tmpData),
        nbFire: this.nbFire(tmpData)
      };
    });
    if (lastIndex < streamData.length - 1) {
      const lastResults = streamData.filter((item, index) => index > lastIndex)
      this.addElements(tmpStreamSummaries[tmpStreamSummaries.length - 1], lastResults);
    }
    return tmpStreamSummaries;
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

  addElements(streamSummary: StreamSummary, resultToAdd: Result[] = []) {
    const tmpResult = this.rebuildTemperature(streamSummary.data.concat(resultToAdd));
    streamSummary.data = tmpResult;
    streamSummary.maxTemperature = this.maxTemperature(tmpResult);
    streamSummary.minTemperature = this.minTemperature(tmpResult);
    streamSummary.nbFire = this.nbFire(tmpResult);
  }

}
