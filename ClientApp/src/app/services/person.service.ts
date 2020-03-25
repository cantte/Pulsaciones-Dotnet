import { Injectable, Inject } from '@angular/core';
import { Person } from "../models/person";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ServerResponse } from '../@base/server-response';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type' : 'application/json',
    'Authorization' : 'my-auth-token'  
  })
};

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  private baseUrl: string;

  constructor(
    private http: HttpClient,
    @Inject('BASE_URL') baseUrl: string,
    private handleHttpError: HandleHttpErrorService
  ) { 
    this.baseUrl = baseUrl;
  }

  post(person: Person): Observable<ServerResponse> {
    return this.http.post<ServerResponse>(this.baseUrl + 'api/People/Add', person, httpOptions)
      .pipe(
        tap(_ => this.handleHttpError.log('Datos guardados')),
        catchError(this.handleHttpError.handleError<ServerResponse>('savePerson', null))
      );
  }

  get(): Observable<Person[]> {
    return this.http.get<Person[]>(this.baseUrl + 'api/People/People')
      .pipe(
        tap(_ => this.handleHttpError.log('Datos recividos')),
        catchError(this.handleHttpError.handleError<Person[]>('getPeople', []))
      );
  }

  getPerson(id: string): Observable<Person> {
    return this.http.get<Person>(this.baseUrl + `api/People/Person/${id}`)
      .pipe(
        tap(_ => this.handleHttpError.log('Datos recividos')),
        catchError(this.handleHttpError.handleError<Person>('searchPerson', null))
      );
  };

  searchPeople(term: string): Observable<Person[]> {
    return this.http.get<Person[]>(this.baseUrl + `api/People/SearchPeople?personId=${term}`)
      .pipe(
        tap(_ => this.handleHttpError.log('Datos recividos')),
        catchError(this.handleHttpError.handleError<Person[]>('searchPeople', []))
      );
  }
}
