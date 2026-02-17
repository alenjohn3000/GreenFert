import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Customermaster } from './customermaster';

describe('Customermaster', () => {
  let component: Customermaster;
  let fixture: ComponentFixture<Customermaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Customermaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Customermaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
