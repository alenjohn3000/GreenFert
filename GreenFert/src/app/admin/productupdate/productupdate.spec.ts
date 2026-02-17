import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productupdate } from './productupdate';

describe('Productupdate', () => {
  let component: Productupdate;
  let fixture: ComponentFixture<Productupdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productupdate]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Productupdate);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
