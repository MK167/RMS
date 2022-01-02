import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollegeDataComponent } from './add-college-data.component';

describe('AddCollegeDataComponent', () => {
  let component: AddCollegeDataComponent;
  let fixture: ComponentFixture<AddCollegeDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCollegeDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCollegeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
