import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Wcassignview } from './wcassignview';

describe('Wcassignview', () => {
  let component: Wcassignview;
  let fixture: ComponentFixture<Wcassignview>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Wcassignview]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Wcassignview);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
