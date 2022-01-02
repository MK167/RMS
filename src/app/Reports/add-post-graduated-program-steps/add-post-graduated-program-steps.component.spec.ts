import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddPostGraduatedProgramStepsComponent } from './add-post-graduated-program-steps.component';

describe('AddPostGraduatedProgramStepsComponent', () => {
  let component: AddPostGraduatedProgramStepsComponent;
  let fixture: ComponentFixture<AddPostGraduatedProgramStepsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddPostGraduatedProgramStepsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddPostGraduatedProgramStepsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
