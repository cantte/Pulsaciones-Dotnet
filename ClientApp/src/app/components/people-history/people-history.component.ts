import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-people-history',
  templateUrl: './people-history.component.html',
  styleUrls: ['./people-history.component.css']
})
export class PeopleHistoryComponent implements OnInit {

  people: Person[] = [];

  constructor(
    private personService: PersonService
  ) { }

  ngOnInit(): void {
    this.loadHistory();
  }

  loadHistory(): void
  {
    this.personService.get().subscribe(people => {
      this.people = people.slice(0, 5);
    });
  }

}
