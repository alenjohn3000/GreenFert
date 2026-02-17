import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wcregister } from './wcregister';

describe('Wcregister', () => {
  let component: Wcregister;
  let fixture: ComponentFixture<Wcregister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wcregister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Wcregister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
