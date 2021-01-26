import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SaveLabelComponent } from './save-label.component';

describe('SaveLabelComponent', () => {
  let component: SaveLabelComponent;
  let fixture: ComponentFixture<SaveLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SaveLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SaveLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
