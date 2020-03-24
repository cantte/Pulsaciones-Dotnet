import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';
import { ActivatedRoute } from '@angular/router';
import { Location } from "@angular/common";

@Component({
  selector: 'app-person-detail',
  templateUrl: './person-detail.component.html',
  styleUrls: ['./person-detail.component.css']
})
export class PersonDetailComponent implements OnInit {

  person: Person;

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private location: Location
    ) { }

  ngOnInit(): void {
    this.getPerson();
  }

  getPerson(): void
  {
    const id = this.route.snapshot.paramMap.get('id');
    this.person = this.personService.getPerson(id);
  }

  goBack(): void
  {
    this.location.back();
  }

}
