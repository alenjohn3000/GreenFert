import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sview } from './sview';

describe('Sview', () => {
  let component: Sview;
  let fixture: ComponentFixture<Sview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
