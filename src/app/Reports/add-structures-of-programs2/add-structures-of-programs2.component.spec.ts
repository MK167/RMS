import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddStructuresOfPrograms2Component } from './add-structures-of-programs2.component';

describe('AddStructuresOfPrograms2Component', () => {
  let component: AddStructuresOfPrograms2Component;
  let fixture: ComponentFixture<AddStructuresOfPrograms2Component>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddStructuresOfPrograms2Component ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddStructuresOfPrograms2Component);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
