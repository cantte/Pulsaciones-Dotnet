import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { PeopleHistoryComponent } from './people-history.component';

describe('PeopleHistoryComponent', () => {
  let component: PeopleHistoryComponent;
  let fixture: ComponentFixture<PeopleHistoryComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ PeopleHistoryComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(PeopleHistoryComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
