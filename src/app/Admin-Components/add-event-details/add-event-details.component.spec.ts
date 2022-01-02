import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventDetailsComponent } from './add-event-details.component';

describe('AddEventDetailsComponent', () => {
  let component: AddEventDetailsComponent;
  let fixture: ComponentFixture<AddEventDetailsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEventDetailsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventDetailsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
