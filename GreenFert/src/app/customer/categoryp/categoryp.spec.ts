import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Categoryp } from './categoryp';

describe('Categoryp', () => {
  let component: Categoryp;
  let fixture: ComponentFixture<Categoryp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Categoryp]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Categoryp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
