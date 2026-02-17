import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Spayment } from './spayment';

describe('Spayment', () => {
  let component: Spayment;
  let fixture: ComponentFixture<Spayment>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Spayment]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Spayment);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
