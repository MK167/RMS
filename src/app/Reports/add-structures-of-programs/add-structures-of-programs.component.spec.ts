import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStructuresOfProgramsComponent } from './add-structures-of-programs.component';

describe('AddStructuresOfProgramsComponent', () => {
  let component: AddStructuresOfProgramsComponent;
  let fixture: ComponentFixture<AddStructuresOfProgramsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStructuresOfProgramsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStructuresOfProgramsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
