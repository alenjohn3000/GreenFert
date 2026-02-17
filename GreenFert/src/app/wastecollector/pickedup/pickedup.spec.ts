import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Pickedup } from './pickedup';

describe('Pickedup', () => {
  let component: Pickedup;
  let fixture: ComponentFixture<Pickedup>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Pickedup]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Pickedup);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
