import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Productedit } from './productedit';

describe('Productedit', () => {
  let component: Productedit;
  let fixture: ComponentFixture<Productedit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Productedit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Productedit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
