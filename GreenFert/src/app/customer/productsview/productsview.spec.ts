import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productsview } from './productsview';

describe('Productsview', () => {
  let component: Productsview;
  let fixture: ComponentFixture<Productsview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productsview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Productsview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
