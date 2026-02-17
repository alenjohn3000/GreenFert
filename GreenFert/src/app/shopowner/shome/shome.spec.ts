import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Shome } from './shome';

describe('Shome', () => {
  let component: Shome;
  let fixture: ComponentFixture<Shome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Shome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Shome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
