import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PersonResgisterComponent } from './person-resgister.component';

describe('PersonResgisterComponent', () => {
  let component: PersonResgisterComponent;
  let fixture: ComponentFixture<PersonResgisterComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PersonResgisterComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PersonResgisterComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
