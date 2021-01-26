import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CreateCardButtonComponent } from './create-card-button.component';

describe('CreateCardButtonComponent', () => {
  let component: CreateCardButtonComponent;
  let fixture: ComponentFixture<CreateCardButtonComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CreateCardButtonComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CreateCardButtonComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
