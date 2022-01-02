import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEventStatusComponent } from './add-event-status.component';

describe('AddEventStatusComponent', () => {
  let component: AddEventStatusComponent;
  let fixture: ComponentFixture<AddEventStatusComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEventStatusComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEventStatusComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
