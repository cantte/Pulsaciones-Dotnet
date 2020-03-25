import { Component, OnInit } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';
import { Router } from '@angular/router';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-person-search',
  templateUrl: './person-search.component.html',
  styleUrls: ['./person-search.component.css']
})
export class PersonSearchComponent implements OnInit {

  people$: Observable<Person[]>;
  private searchTerms = new Subject<string>();

  constructor(
    private personService: PersonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.people$ = this.searchTerms.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap((term: string) => this.personService.searchPeople(term)));
  }

  searchPerson(term: string): void
  {
    this.searchTerms.next(term);
  }

  searchPersonDetails(id: string): void
  {
    if (id !== '')
      this.router.navigateByUrl(`person/${id}`);
  }

}
