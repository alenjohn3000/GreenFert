import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Locationedit } from './locationedit';

describe('Locationedit', () => {
  let component: Locationedit;
  let fixture: ComponentFixture<Locationedit>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Locationedit]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Locationedit);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
