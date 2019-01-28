import { Injectable, Output, EventEmitter } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class KartService {

  kartCount = 0;

  @Output() countEmitter: EventEmitter<any>  = new EventEmitter();

  constructor() { }

  setkartCount(count: number) {
    this.kartCount = this.kartCount + count;
    this.countEmitter.emit(this.kartCount);
  }

  getKartCount() {
    return this.kartCount;
  }
}
