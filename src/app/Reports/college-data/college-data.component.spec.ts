import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CollegeDataComponent } from './college-data.component';

describe('CollegeDataComponent', () => {
  let component: CollegeDataComponent;
  let fixture: ComponentFixture<CollegeDataComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CollegeDataComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CollegeDataComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
