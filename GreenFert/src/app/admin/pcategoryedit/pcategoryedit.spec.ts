import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pcategoryedit } from './pcategoryedit';

describe('Pcategoryedit', () => {
  let component: Pcategoryedit;
  let fixture: ComponentFixture<Pcategoryedit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pcategoryedit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pcategoryedit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
