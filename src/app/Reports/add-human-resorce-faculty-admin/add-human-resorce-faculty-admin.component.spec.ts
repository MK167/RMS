import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHumanResorceFacultyAdminComponent } from './add-human-resorce-faculty-admin.component';

describe('AddHumanResorceFacultyAdminComponent', () => {
  let component: AddHumanResorceFacultyAdminComponent;
  let fixture: ComponentFixture<AddHumanResorceFacultyAdminComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHumanResorceFacultyAdminComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHumanResorceFacultyAdminComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
