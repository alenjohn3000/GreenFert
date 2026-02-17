import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sregister } from './sregister';

describe('Sregister', () => {
  let component: Sregister;
  let fixture: ComponentFixture<Sregister>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sregister]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sregister);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
