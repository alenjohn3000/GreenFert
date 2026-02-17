import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pstatus } from './pstatus';

describe('Pstatus', () => {
  let component: Pstatus;
  let fixture: ComponentFixture<Pstatus>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pstatus]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pstatus);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
