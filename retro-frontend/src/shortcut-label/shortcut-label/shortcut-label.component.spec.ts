import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShortcutLabelComponent } from './shortcut-label.component';

describe('ShortcutLabelComponent', () => {
  let component: ShortcutLabelComponent;
  let fixture: ComponentFixture<ShortcutLabelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ShortcutLabelComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ShortcutLabelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
