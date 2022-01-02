import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EventVenueComponent } from './event-venue.component';

describe('EventVenueComponent', () => {
  let component: EventVenueComponent;
  let fixture: ComponentFixture<EventVenueComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EventVenueComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EventVenueComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
