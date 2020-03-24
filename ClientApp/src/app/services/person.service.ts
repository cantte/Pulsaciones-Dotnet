import { Injectable } from '@angular/core';
import { Person } from "../models/person";

@Injectable({
  providedIn: 'root'
})
export class PersonService {

  constructor() { }

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
      return people.find(person => person.personId == id);
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
    return people.filter(person => person.personId.includes(term));
  }
}
