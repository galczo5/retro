import {ComponentFixture, TestBed} from '@angular/core/testing';

import {SessionControlPanelComponent} from './session-control-panel.component';

describe('SessionControlPanelComponent', () => {
  let component: SessionControlPanelComponent;
  let fixture: ComponentFixture<SessionControlPanelComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SessionControlPanelComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SessionControlPanelComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
