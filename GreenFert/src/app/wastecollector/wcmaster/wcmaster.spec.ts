import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wcmaster } from './wcmaster';

describe('Wcmaster', () => {
  let component: Wcmaster;
  let fixture: ComponentFixture<Wcmaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wcmaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Wcmaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
