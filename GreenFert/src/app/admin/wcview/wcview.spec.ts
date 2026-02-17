import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wcview } from './wcview';

describe('Wcview', () => {
  let component: Wcview;
  let fixture: ComponentFixture<Wcview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wcview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Wcview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
