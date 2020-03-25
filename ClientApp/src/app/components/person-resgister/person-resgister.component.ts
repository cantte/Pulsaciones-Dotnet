import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';

@Component({
  selector: 'app-person-resgister',
  templateUrl: './person-resgister.component.html',
  styleUrls: ['./person-resgister.component.css']
})
export class PersonResgisterComponent implements OnInit {

  personForm: FormGroup;
  invalidForm: boolean;
  pulsations: number = 0;

  constructor(private personService: PersonService) { }

  ngOnInit(): void {
    this.personForm = this.createFormGroup();
  }

  createFormGroup() {
    return new FormGroup({
      personId: new FormControl('', [Validators.required, Validators.minLength(5)]),
      personName: new FormControl('', [Validators.required, Validators.minLength(3)]),
      personAge: new FormControl('', [Validators.required, Validators.max(100), Validators.min(1)]),
      personSex: new FormControl('', [Validators.required])
    })
  }

  onSubmit() {
    if (this.personForm.valid) {
        let person: Person = new Person();
        person.personId = this.personForm.value.personId;
        person.name = this.personForm.value.personName;
        person.age = +this.personForm.value.personAge;
        person.sex = this.personForm.value.personSex;
        person.CalculatePulsations();
        this.personService.savePerson(person);
        this.onResetForm();
    }
    else this.invalidForm = true;
  }

  onResetForm() {
    this.personForm.reset();
    this.invalidForm = false;
  }

  calculatePulsations() {
    if (this.personForm.controls['personAge'].valid && this.personForm.controls['personSex'].valid) {
      let sex = this.personForm.controls['personSex'].value;
      let age = +this.personForm.controls['personAge'].value;
      this.pulsations = (sex == "F") ? ((210 - age) / 10) : ((220 - age) / 10);
      this.invalidForm = false;
    }
    else this.invalidForm = true;
  }
}
