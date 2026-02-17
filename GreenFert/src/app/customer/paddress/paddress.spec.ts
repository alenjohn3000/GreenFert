import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Paddress } from './paddress';

describe('Paddress', () => {
  let component: Paddress;
  let fixture: ComponentFixture<Paddress>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Paddress]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Paddress);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
