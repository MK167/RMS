import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddSDComponent } from './add-sd.component';

describe('AddSDComponent', () => {
  let component: AddSDComponent;
  let fixture: ComponentFixture<AddSDComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddSDComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(AddSDComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
