import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TopLeftLogoComponent } from './top-left-logo.component';

describe('TopLeftLogoComponent', () => {
  let component: TopLeftLogoComponent;
  let fixture: ComponentFixture<TopLeftLogoComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TopLeftLogoComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(TopLeftLogoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
