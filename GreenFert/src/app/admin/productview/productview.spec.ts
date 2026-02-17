import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productview } from './productview';

describe('Productview', () => {
  let component: Productview;
  let fixture: ComponentFixture<Productview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Productview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
