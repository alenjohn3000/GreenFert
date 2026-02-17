import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Spaddress } from './spaddress';

describe('Spaddress', () => {
  let component: Spaddress;
  let fixture: ComponentFixture<Spaddress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Spaddress]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Spaddress);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
