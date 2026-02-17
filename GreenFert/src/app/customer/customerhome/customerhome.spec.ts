import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Customerhome } from './customerhome';

describe('Customerhome', () => {
  let component: Customerhome;
  let fixture: ComponentFixture<Customerhome>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Customerhome]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Customerhome);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
