import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NewSessionCreatorComponent } from './new-session-creator.component';

describe('NewSessionCreatorComponent', () => {
  let component: NewSessionCreatorComponent;
  let fixture: ComponentFixture<NewSessionCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ NewSessionCreatorComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewSessionCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
