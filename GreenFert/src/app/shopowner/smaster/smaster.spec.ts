import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Smaster } from './smaster';

describe('Smaster', () => {
  let component: Smaster;
  let fixture: ComponentFixture<Smaster>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Smaster]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Smaster);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
