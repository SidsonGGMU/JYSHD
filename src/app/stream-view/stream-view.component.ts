import { Component, OnInit } from '@angular/core';
import {DataserviceService} from "../services/dataservice.service";
import {Result} from "../models/models";

@Component({
  selector: 'app-stream-view',
  templateUrl: './stream-view.component.html',
  styleUrls: ['./stream-view.component.scss']
})
export class StreamViewComponent implements OnInit {

  public streamData: Result[] = [];

  constructor(private dataService: DataserviceService) { }

  ngOnInit() {
    this.dataService.fetchData()
      .subscribe(data => {
        this.streamData = data.result;
      });
  }

}
