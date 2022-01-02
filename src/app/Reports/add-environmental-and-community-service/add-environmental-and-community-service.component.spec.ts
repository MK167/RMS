import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddEnvironmentalAndCommunityServiceComponent } from './add-environmental-and-community-service.component';

describe('AddEnvironmentalAndCommunityServiceComponent', () => {
  let component: AddEnvironmentalAndCommunityServiceComponent;
  let fixture: ComponentFixture<AddEnvironmentalAndCommunityServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddEnvironmentalAndCommunityServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddEnvironmentalAndCommunityServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
