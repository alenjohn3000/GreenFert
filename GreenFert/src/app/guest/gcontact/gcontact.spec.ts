import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Gcontact } from './gcontact';

describe('Gcontact', () => {
  let component: Gcontact;
  let fixture: ComponentFixture<Gcontact>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Gcontact]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Gcontact);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
