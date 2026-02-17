import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wcdetails } from './wcdetails';

describe('Wcdetails', () => {
  let component: Wcdetails;
  let fixture: ComponentFixture<Wcdetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wcdetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Wcdetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
