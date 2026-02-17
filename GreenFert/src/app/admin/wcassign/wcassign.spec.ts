import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wcassign } from './wcassign';

describe('Wcassign', () => {
  let component: Wcassign;
  let fixture: ComponentFixture<Wcassign>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wcassign]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Wcassign);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
