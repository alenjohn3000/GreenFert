import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Locationview } from './locationview';

describe('Locationview', () => {
  let component: Locationview;
  let fixture: ComponentFixture<Locationview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Locationview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Locationview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
