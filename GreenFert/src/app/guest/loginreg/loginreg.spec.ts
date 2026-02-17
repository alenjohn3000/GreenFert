import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Loginreg } from './loginreg';

describe('Loginreg', () => {
  let component: Loginreg;
  let fixture: ComponentFixture<Loginreg>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Loginreg]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Loginreg);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
