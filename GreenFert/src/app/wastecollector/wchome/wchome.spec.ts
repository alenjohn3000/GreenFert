import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wchome } from './wchome';

describe('Wchome', () => {
  let component: Wchome;
  let fixture: ComponentFixture<Wchome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wchome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Wchome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
