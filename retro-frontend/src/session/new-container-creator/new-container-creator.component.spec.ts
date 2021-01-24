import {ComponentFixture, TestBed} from '@angular/core/testing';

import {NewContainerCreatorComponent} from './new-container-creator.component';

describe('NewContainerCreatorComponent', () => {
  let component: NewContainerCreatorComponent;
  let fixture: ComponentFixture<NewContainerCreatorComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [NewContainerCreatorComponent]
    })
      .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(NewContainerCreatorComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
