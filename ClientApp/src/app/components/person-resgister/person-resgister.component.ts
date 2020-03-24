import { Component, OnInit } from '@angular/core';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-resgister',
  templateUrl: './person-resgister.component.html',
  styleUrls: ['./person-resgister.component.css']
})
export class PersonResgisterComponent implements OnInit {

  person: Person = new Person();

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
  }

  savePerson(): void
  {
    this.person.CalculatePulsations();
    this.personService.post(this.person).subscribe(serverResponse => {
      console.log(serverResponse);
    });
  }

  calculatePulsations(): void
  {
    this.person.CalculatePulsations();
  }

}
