import {Component, Input, OnInit} from '@angular/core';
import {StreamSummary} from '../models/models';

@Component({
  selector: 'app-stream-item',
  templateUrl: './stream-item.component.html',
  styleUrls: ['./stream-item.component.scss']
})
export class StreamItemComponent implements OnInit {

  @Input() dataStreamSummary: StreamSummary;

  constructor() { }

  ngOnInit() {
  }

}
