import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class ApixuService {
  public baseUrl = 'http://api.weatherstack.com/current';
  private apiKey = '2c65582c773db5e37845db51c0ec2070';

  constructor(private http: HttpClient) { }

  getWeather() {
    return this.http.get(`${this.baseUrl}?access_key=${this.apiKey}&query=Grenoble`);
  }
}
