import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Districtedit } from './districtedit';

describe('Districtedit', () => {
  let component: Districtedit;
  let fixture: ComponentFixture<Districtedit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Districtedit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Districtedit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
