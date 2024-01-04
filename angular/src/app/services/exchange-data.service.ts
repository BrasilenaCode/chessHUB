import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeDataService {

  private stringSource = new BehaviorSubject<string>('');
  currentString = this.stringSource.asObservable();

  updateString(newString: string) {
    this.stringSource.next(newString);
  }
  
}
