import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Ordermasterview } from './ordermasterview';

describe('Ordermasterview', () => {
  let component: Ordermasterview;
  let fixture: ComponentFixture<Ordermasterview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Ordermasterview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Ordermasterview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
