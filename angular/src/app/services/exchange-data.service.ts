import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ExchangeDataService {

  private stringSource = new BehaviorSubject<string>('');
  currentString = this.stringSource.asObservable();

  updateString(newString: string) {
    // ogni volta che l'utente modifica il textfield del tab di ricerca
    // la stringa viene aggiornata
    this.stringSource.next(newString);
  }
  
}
