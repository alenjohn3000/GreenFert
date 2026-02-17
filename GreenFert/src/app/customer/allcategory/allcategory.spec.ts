import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Allcategory } from './allcategory';

describe('Allcategory', () => {
  let component: Allcategory;
  let fixture: ComponentFixture<Allcategory>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Allcategory]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Allcategory);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
