import { Injectable } from '@angular/core';
import { Person } from '../models/person';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { HandleHttpErrorService } from '../@base/handle-http-error.service';
import { Observable } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import { ServerResponse } from '../@base/server-response';

const httpOptions = {
	headers: new HttpHeaders({
		'Content-Type': 'application/json',
		Authorization: 'my-auth-token'
	})
};

@Injectable({
	providedIn: 'root'
})
export class PersonService {
	private peopleUrl: string = 'api/People';

	constructor(private http: HttpClient, private handleHttpError: HandleHttpErrorService) {}

	post(person: Person): Observable<Person> {
		return this.http
			.post<Person>(`${this.peopleUrl}`, person, httpOptions)
			.pipe(
				tap((_) => this.handleHttpError.log('Data save.')),
				catchError(this.handleHttpError.handleError<Person>('savePerson', null))
			);
	}

	get(): Observable<Person[]> {
		return this.http
			.get<Person[]>(`${this.peopleUrl}`)
			.pipe(
				tap((_) => this.handleHttpError.log('Data receive.')),
				catchError(this.handleHttpError.handleError<Person[]>('getPeople', []))
			);
	}

	put(person: Person): Observable<Person> {
		return this.http
			.put<Person>(`${this.peopleUrl}/${person.personId}`, person, httpOptions)
			.pipe(
				tap((_) => this.handleHttpError.log('Data update.')),
				catchError(this.handleHttpError.handleError<Person>('updatePerson', null))
			);
	}

	delete(id: string): Observable<ServerResponse> {
		return this.http
			.delete<ServerResponse>(`${this.peopleUrl}/${id}`)
			.pipe(
				tap((_) => this.handleHttpError.log('Data delete.')),
				catchError(this.handleHttpError.handleError<ServerResponse>('deletePerson', null))
			);
	}

	getPerson(id: string): Observable<Person> {
		return this.http
			.get<Person>(`${this.peopleUrl}/${id}`)
			.pipe(
				tap((_) => this.handleHttpError.log('Data receive.')),
				catchError(this.handleHttpError.handleError<Person>('searchPerson', null))
			);
	}

	searchPeople(term: string): Observable<Person[]> {
		return this.http
			.get<Person[]>(`${this.peopleUrl}/SearchPeople?personId=${term}`)
			.pipe(
				tap((_) => this.handleHttpError.log('Data receive.')),
				catchError(this.handleHttpError.handleError<Person[]>('searchPeople', []))
			);
	}

	calculatePulsations(sex: string, age: number): Observable<number> {
		return this.http
			.get<number>(`${this.peopleUrl}/CalculatePulsations?sex=${sex}&age=${age}`)
			.pipe(
				tap((_) => this.handleHttpError.log('Pulsations calculated')),
				catchError(this.handleHttpError.handleError<number>('calculatePulsations', 0))
			);
	}
}
