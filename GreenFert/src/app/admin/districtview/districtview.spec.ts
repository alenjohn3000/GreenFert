import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Districtview } from './districtview';

describe('Districtview', () => {
  let component: Districtview;
  let fixture: ComponentFixture<Districtview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Districtview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Districtview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
