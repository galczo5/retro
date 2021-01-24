import { ComponentFixture, TestBed } from '@angular/core/testing';

import { UnlockSessionComponent } from './unlock-session.component';

describe('UnlockSessionComponent', () => {
  let component: UnlockSessionComponent;
  let fixture: ComponentFixture<UnlockSessionComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ UnlockSessionComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(UnlockSessionComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
