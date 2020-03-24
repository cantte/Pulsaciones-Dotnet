import { Injectable, Inject } from '@angular/core';
import { Person } from "../models/person";
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';

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

  post(person: Person): Observable<Person> {
    return this.http.post<Person>(this.baseUrl + 'api/People/Add', person, httpOptions)
      .pipe(
        tap(_ => this.handleHttpError.log('Datos guardados')),
        catchError(this.handleHttpError.handleError<Person>('savePerson', null))
      );
  }

  get(): Observable<Person[]> {
    return this.http.get<Person[]>(this.baseUrl + 'api/People/People')
      .pipe(
        tap(_ => this.handleHttpError.log('Datos recividos')),
        catchError(this.handleHttpError.handleError<Person[]>('getPeople', []))
      );
  }

  savePerson(person: Person): void
  {
    let people: Person[] = this.getPeople();

    if (!people) people = [];

    people.push(person);
    localStorage.setItem('people', JSON.stringify(people));
  }

  getPerson(id: string): Person
  {
    let people: Person[] = this.getPeople();

    if (people)
      return people.find(person => person.id == id);
    else return null;
  }

  getPeople(): Person[] 
  {
    return JSON.parse(localStorage.getItem('people'));
  }

  searchPeople(term: string): Person[]
  {
    if (!term.trim()) return [];

    let people: Person[] = this.getPeople();
    return people.filter(person => person.id.includes(term));
  }
}
