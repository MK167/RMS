import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCollegeProgramsComponent } from './add-college-programs.component';

describe('AddCollegeProgramsComponent', () => {
  let component: AddCollegeProgramsComponent;
  let fixture: ComponentFixture<AddCollegeProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddCollegeProgramsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddCollegeProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
