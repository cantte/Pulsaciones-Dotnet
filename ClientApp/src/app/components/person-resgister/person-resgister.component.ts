import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';
import { ServerResponse } from 'src/app/@base/server-response';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-person-resgister',
  templateUrl: './person-resgister.component.html',
  styleUrls: ['./person-resgister.component.css']
})
export class PersonResgisterComponent implements OnInit {

  personForm: FormGroup;
  invalidForm: boolean;
  updateForm: boolean = false;
  serverResponse: ServerResponse = null;
  pulsations: number = 0;
  title: string;

  constructor(
    private personService: PersonService,
    private route: ActivatedRoute,
    private router: Router
  ) { }

  ngOnInit(): void {
    this.personForm = this.createFormGroup();
    const urlPath = this.route.snapshot.url[0].path;
    this.title = `Form of ${urlPath} person`;
    if (urlPath == 'edit') {
      this.updateForm = true;
      this.loadPerson();
    }
      
  }

  loadPerson() {
    const id = this.route.snapshot.paramMap.get('id');
    this.personService.getPerson(id).subscribe(p => {
      if (p != null) {
        this.personForm.controls.personId.setValue(p.personId);
        this.personForm.controls.personName.setValue(p.name);
        this.personForm.controls.personAge.setValue(p.age);
        this.personForm.controls.personSex.setValue(p.sex);
      }
    });
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

      if (this.updateForm) {
        this.personService.put(person).subscribe(serverResponse => {
          this.handleServerResponse(serverResponse);
        });
      }
      else {
        this.personService.post(person).subscribe(serverResponse => {
          this.handleServerResponse(serverResponse);
        });
      }
    }
    else this.invalidForm = true;
  }

  handleServerResponse(serverResponse: ServerResponse) {
    this.serverResponse = serverResponse;
    setTimeout(() => {
      this.serverResponse = null;
      if (this.updateForm) {
        if (serverResponse.success)
          this.router.navigateByUrl(`person/${this.personForm.value.personId}`);
      }
      else {
        if (serverResponse.success)
          this.onResetForm();
      }
    }, 3000);
  }

  onResetForm() {
    this.personForm.reset();
    this.invalidForm = false;
  }

  calculatePulsations() {
    if (this.personForm.controls['personAge'].valid && this.personForm.controls['personSex'].valid) {
      let sex = this.personForm.controls['personSex'].value;
      let age = +this.personForm.controls['personAge'].value;
      this.personService.calculatePulsations(sex, age).subscribe(pul => this.pulsations = pul);
      this.invalidForm = false;
    }
    else this.invalidForm = true;
  }
}
