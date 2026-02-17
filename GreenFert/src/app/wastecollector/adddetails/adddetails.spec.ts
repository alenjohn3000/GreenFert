import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Adddetails } from './adddetails';

describe('Adddetails', () => {
  let component: Adddetails;
  let fixture: ComponentFixture<Adddetails>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Adddetails]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Adddetails);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
