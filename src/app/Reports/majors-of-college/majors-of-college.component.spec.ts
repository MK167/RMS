import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MajorsOfCollegeComponent } from './majors-of-college.component';

describe('MajorsOfCollegeComponent', () => {
  let component: MajorsOfCollegeComponent;
  let fixture: ComponentFixture<MajorsOfCollegeComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MajorsOfCollegeComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MajorsOfCollegeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
