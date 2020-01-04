import {Component, OnDestroy, OnInit} from '@angular/core';
import {DataserviceService} from '../services/dataservice.service';
import {StreamSummary} from '../models/models';
import {Subscription} from 'rxjs';
import {StreamSummaryService} from '../services/stream-summary.service';

@Component({
  selector: 'app-stream-view',
  templateUrl: './stream-view.component.html',
  styleUrls: ['./stream-view.component.scss']
})

export class StreamViewComponent implements OnInit, OnDestroy {

  public streamData: StreamSummary[] =  [];
  private sub: Subscription;
  public isLoading: boolean;
  private isFirstTime = true;
  public hasData = () => this.streamData && this.streamData.length > 0;

  constructor(private dataService: DataserviceService,
              private streamSummaryService: StreamSummaryService) { }

  ngOnInit() {
    this._fetchData();
    setInterval(() => {
      this._fetchData();
    }, 20000);
  }

  private _fetchData() {
    this.startLoading()
    this.sub = this.dataService.fetchData()
      .subscribe(data => {
        this.streamData = this.streamSummaryService.generateStream(data.result);
        this.stopLoading();
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private startLoading() {
    if (this.isFirstTime) {
      this.isLoading = true;
      this.isFirstTime = false;
    }
  }

  private stopLoading() {
    this.isLoading = false;
  }

}
