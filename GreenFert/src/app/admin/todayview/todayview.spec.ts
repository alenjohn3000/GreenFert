import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Todayview } from './todayview';

describe('Todayview', () => {
  let component: Todayview;
  let fixture: ComponentFixture<Todayview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Todayview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Todayview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
