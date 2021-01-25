import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ContainerHandleComponent } from './container-handle.component';

describe('ContainerHandleComponent', () => {
  let component: ContainerHandleComponent;
  let fixture: ComponentFixture<ContainerHandleComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ ContainerHandleComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(ContainerHandleComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
