import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-people',
  templateUrl: './people.component.html',
  styleUrls: ['./people.component.css']
})
export class PeopleComponent implements OnInit {

  people: Person[];

  constructor(
    private personService: PersonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPeople();
  }

  getPeople(): void 
  {
    this.people = this.personService.getPeople();
  }

  goTo(person: Person): void
  {
    this.router.navigateByUrl(`person/${person.personId}`);
  }

}
