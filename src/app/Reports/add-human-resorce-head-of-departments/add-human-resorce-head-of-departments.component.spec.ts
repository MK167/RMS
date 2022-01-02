import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHumanResorceHeadOfDepartmentsComponent } from './add-human-resorce-head-of-departments.component';

describe('AddHumanResorceHeadOfDepartmentsComponent', () => {
  let component: AddHumanResorceHeadOfDepartmentsComponent;
  let fixture: ComponentFixture<AddHumanResorceHeadOfDepartmentsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHumanResorceHeadOfDepartmentsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHumanResorceHeadOfDepartmentsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
