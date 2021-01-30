import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CardReactionsComponent } from './card-reactions.component';

describe('CardReactionsComponent', () => {
  let component: CardReactionsComponent;
  let fixture: ComponentFixture<CardReactionsComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CardReactionsComponent ]
    })
    .compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(CardReactionsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
