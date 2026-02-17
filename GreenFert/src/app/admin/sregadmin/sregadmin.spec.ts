import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sregadmin } from './sregadmin';

describe('Sregadmin', () => {
  let component: Sregadmin;
  let fixture: ComponentFixture<Sregadmin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sregadmin]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sregadmin);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
