import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddHumanResorceResearchUnitsComponent } from './add-human-resorce-research-units.component';

describe('AddHumanResorceResearchUnitsComponent', () => {
  let component: AddHumanResorceResearchUnitsComponent;
  let fixture: ComponentFixture<AddHumanResorceResearchUnitsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddHumanResorceResearchUnitsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddHumanResorceResearchUnitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
