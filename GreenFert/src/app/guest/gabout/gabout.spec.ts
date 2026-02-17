import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gabout } from './gabout';

describe('Gabout', () => {
  let component: Gabout;
  let fixture: ComponentFixture<Gabout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gabout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gabout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
