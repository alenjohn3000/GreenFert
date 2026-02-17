import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Scontact } from './scontact';

describe('Scontact', () => {
  let component: Scontact;
  let fixture: ComponentFixture<Scontact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Scontact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Scontact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
