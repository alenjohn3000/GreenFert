import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pcategory } from './pcategory';

describe('Pcategory', () => {
  let component: Pcategory;
  let fixture: ComponentFixture<Pcategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pcategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pcategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
