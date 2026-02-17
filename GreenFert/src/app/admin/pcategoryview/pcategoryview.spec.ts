import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pcategoryview } from './pcategoryview';

describe('Pcategoryview', () => {
  let component: Pcategoryview;
  let fixture: ComponentFixture<Pcategoryview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pcategoryview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pcategoryview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
