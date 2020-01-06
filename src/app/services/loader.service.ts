import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {
  public loading: boolean;
  constructor() { }

  public startAnimation() {
    this.loading = true;
  }
  public stopAnimation() {
    this.loading = false;
  }
}
