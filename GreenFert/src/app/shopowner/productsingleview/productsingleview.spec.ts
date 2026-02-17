import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productsingleview } from './productsingleview';

describe('Productsingleview', () => {
  let component: Productsingleview;
  let fixture: ComponentFixture<Productsingleview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productsingleview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Productsingleview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
