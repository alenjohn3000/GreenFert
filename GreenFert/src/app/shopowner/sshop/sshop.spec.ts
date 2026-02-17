import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Sshop } from './sshop';

describe('Sshop', () => {
  let component: Sshop;
  let fixture: ComponentFixture<Sshop>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Sshop]
    })
    .compileComponents();

    fixture = TestBed.createComponent(Sshop);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
