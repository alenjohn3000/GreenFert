import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Spview } from './spview';

describe('Spview', () => {
  let component: Spview;
  let fixture: ComponentFixture<Spview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Spview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Spview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
