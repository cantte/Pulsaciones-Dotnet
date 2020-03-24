import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class HandleHttpErrorService {

  constructor() { }

  handleError<T>(operation = 'operation', result?: T)
  {
    return (error: any): Observable<T> => {
      console.error('Error in operation' + operation);
      console.error(error);
      return of(result as T);
    }
  }

  log(message: string) {
    console.log(message);
  }
}
