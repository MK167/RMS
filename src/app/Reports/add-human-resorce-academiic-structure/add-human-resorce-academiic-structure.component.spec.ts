import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHumanResorceAcademiicStructureComponent } from './add-human-resorce-academiic-structure.component';

describe('AddHumanResorceAcademiicStructureComponent', () => {
  let component: AddHumanResorceAcademiicStructureComponent;
  let fixture: ComponentFixture<AddHumanResorceAcademiicStructureComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHumanResorceAcademiicStructureComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHumanResorceAcademiicStructureComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
