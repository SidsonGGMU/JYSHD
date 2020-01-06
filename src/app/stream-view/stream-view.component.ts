import { Component, OnDestroy, OnInit } from '@angular/core';
import { DataserviceService } from '../services/dataservice.service';
import { StreamSummary } from '../models/models';
import { Subscription } from 'rxjs';
import { StreamSummaryService } from '../services/stream-summary.service';
import { LoaderService } from '../services/loader.service';
import { trigger, transition, style, animate } from '@angular/animations';

@Component({
  selector: 'app-stream-view',
  templateUrl: './stream-view.component.html',
  styleUrls: ['./stream-view.component.scss'],
  animations: [
    trigger(
      'inOutAnimation',
      [
        transition(
          ':enter',
          [
            style({ height: 0, opacity: 0 }),
            animate('1s ease-out',
              style({ height: 300, opacity: 1 }))
          ]
        ),
        transition(
          ':leave',
          [
            style({ height: 300, opacity: 1 }),
            animate('1s ease-in',
              style({ height: 0, opacity: 0 }))
          ]
        )
      ]
    )
  ]
})

export class StreamViewComponent implements OnInit, OnDestroy {

  public streamData: StreamSummary[] = [];
  private sub: Subscription;
  public isLoading: boolean;
  private isFirstTime = true;
  public hasData = () => this.streamData && this.streamData.length > 0;

  constructor(private dataService: DataserviceService,
    private streamSummaryService: StreamSummaryService, public loaderService: LoaderService) { }

  ngOnInit() {
    this._fetchData();
    setInterval(() => {
      this._fetchData();
    }, 20000);
  }

  private _fetchData() {
    this.startLoading();
    this.sub = this.dataService.fetchData()
      .subscribe(data => {
        this.streamData = this.streamSummaryService.generateStream(data.result);
      });
  }

  ngOnDestroy() {
    if (this.sub) {
      this.sub.unsubscribe();
    }
  }

  private startLoading() {
    if (this.isFirstTime) {
      this.loaderService.startAnimation();
      setTimeout(() => {
        this.isFirstTime = false;
        this.loaderService.stopAnimation();
      }, 1500);
    }
  }
}
