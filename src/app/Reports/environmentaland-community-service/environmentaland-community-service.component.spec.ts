import { ComponentFixture, TestBed } from '@angular/core/testing';

import { EnvironmentalandCommunityServiceComponent } from './environmentaland-community-service.component';

describe('EnvironmentalandCommunityServiceComponent', () => {
  let component: EnvironmentalandCommunityServiceComponent;
  let fixture: ComponentFixture<EnvironmentalandCommunityServiceComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ EnvironmentalandCommunityServiceComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(EnvironmentalandCommunityServiceComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
