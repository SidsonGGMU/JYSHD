import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})


export class DataserviceService {
  private urlDomain: string = 'https://api.iotagora.net/';

  constructor() { }
}
