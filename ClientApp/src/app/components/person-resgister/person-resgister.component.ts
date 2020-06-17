import { Component, OnInit } from '@angular/core';
import { FormGroup, FormControl, Validators, FormBuilder, AbstractControl } from '@angular/forms';
import { Person } from 'src/app/models/person';
import { PersonService } from 'src/app/services/person.service';
import { ServerResponse } from 'src/app/@base/server-response';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
	selector: 'app-person-resgister',
	templateUrl: './person-resgister.component.html',
	styleUrls: [ './person-resgister.component.css' ]
})
export class PersonResgisterComponent implements OnInit {
	personForm: FormGroup;
	person: Person = new Person();
	invalidForm: boolean;
	updateForm: boolean = false;
	serverResponse: ServerResponse = null;
	pulsations: number = null;
	title: string;

	public get controls() {
		return this.personForm.controls;
	}

	constructor(
		private personService: PersonService,
		private route: ActivatedRoute,
		private router: Router,
		private formBuilder: FormBuilder
	) {}

	ngOnInit(): void {
		this.initForm();
		this.setFormType();

		if (this.updateForm) {
			this.controls['personId'].disable();
			this.loadPerson();
		} else {
			const id = this.route.snapshot.paramMap.get('id');
			if (id) {
				this.controls['personId'].disable();
				this.controls['personId'].setValue(id);
			}
		}
	}

	initForm() {
		this.personForm = this.formBuilder.group({
			personId: [ '', [ Validators.required, Validators.minLength(5), Validators.pattern('[0-9]+') ] ],
			personName: [ '', [ Validators.required, Validators.minLength(5) ] ],
			personAge: [ '', [ Validators.required, Validators.max(100), Validators.min(1) ] ],
			personSex: [ '', [ Validators.required ] ]
		});
	}

	setFormType() {
		const urlPath = this.route.snapshot.url[0].path;
		this.title = `Form of ${urlPath} person`;
		if (urlPath == 'edit') {
			this.updateForm = true;
		}
	}

	loadPerson() {
		const id = this.route.snapshot.paramMap.get('id');
		this.personService.getPerson(id).subscribe((p) => {
			if (p != null) {
				this.pulsations = p.pulsations;
				this.controls['personId'].setValue(p.personId);
				this.controls['personName'].setValue(p.name);
				this.controls['personAge'].setValue(p.age);
				this.controls['personSex'].setValue(p.sex);
			}
		});
	}

	onSubmit() {
		if (this.personForm.valid) {
			this.person.personId = this.controls['personId'].value;
			this.person.name = this.controls['personName'].value;
			this.person.age = +this.controls['personAge'].value;
			this.person.sex = this.controls['personSex'].value;

			if (this.updateForm) {
				this.personService.put(this.person).subscribe((serverResponse) => {
					this.handleServerResponse(serverResponse);
				});
			} else {
				this.personService.post(this.person).subscribe((person) => {
					this.handleServerResponse(person);
				});
			}
		} else this.invalidForm = true;
	}

	handleServerResponse(personS: Person) {
		setTimeout(() => {
			this.person = new Person();
			if (this.updateForm) {
				if (personS) this.router.navigateByUrl(`person/${this.controls['personId'].value}`);
			} else {
				if (personS) this.onResetForm();
				this.router.navigateByUrl('people');
			}
		}, 3000);
	}

	onResetForm() {
		this.personForm.reset();
		this.invalidForm = false;
	}

	calculatePulsations() {
		if (this.controls['personAge'].valid && this.controls['personSex'].valid) {
			const sex = this.controls['personSex'].value;
			const age = +this.controls['personAge'].value;
			this.personService.calculatePulsations(sex, age).subscribe((pul) => (this.pulsations = pul));
			this.invalidForm = false;
		} else this.invalidForm = true;
	}
}
