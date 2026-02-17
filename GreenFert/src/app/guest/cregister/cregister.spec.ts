import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Cregister } from './cregister';

describe('Cregister', () => {
  let component: Cregister;
  let fixture: ComponentFixture<Cregister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Cregister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Cregister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
