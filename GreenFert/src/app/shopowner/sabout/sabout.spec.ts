import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sabout } from './sabout';

describe('Sabout', () => {
  let component: Sabout;
  let fixture: ComponentFixture<Sabout>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sabout]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sabout);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
