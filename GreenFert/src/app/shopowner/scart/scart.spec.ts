import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scart } from './scart';

describe('Scart', () => {
  let component: Scart;
  let fixture: ComponentFixture<Scart>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Scart]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Scart);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
