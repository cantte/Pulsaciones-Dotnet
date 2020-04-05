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
  displayedColumns: string[] = ['id', 'name', 'age', 'sex', 'pulsations', 'edit', 'delete'];
  constructor(
    private personService: PersonService,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.getPeople();
  }

  getPeople(): void 
  {
    this.personService.get().subscribe(people => this.people = people);
  }

  goTo(person: Person): void
  {
    this.router.navigateByUrl(`person/${person.personId}`);
  }

  deletePerson(person: Person) {
    this.people = this.people.filter(p => p.personId !== person.personId);
    this.personService.delete(person.personId).subscribe();
  }

  editPerson(person: Person) {
    this.router.navigateByUrl(`edit/${person.personId}`);
  }
}
