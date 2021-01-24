import { ComponentFixture, TestBed } from '@angular/core/testing';

import { MergeCardsComponent } from './merge-cards.component';

describe('MergeCardsComponent', () => {
  let component: MergeCardsComponent;
  let fixture: ComponentFixture<MergeCardsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ MergeCardsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(MergeCardsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
