import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddMajorsOfCollegeComponent } from './add-majors-of-college.component';

describe('AddMajorsOfCollegeComponent', () => {
  let component: AddMajorsOfCollegeComponent;
  let fixture: ComponentFixture<AddMajorsOfCollegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddMajorsOfCollegeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddMajorsOfCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
