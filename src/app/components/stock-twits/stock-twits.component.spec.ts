import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { StockTwitsComponent } from './stock-twits.component';

describe('StockTwitsComponent', () => {
  let component: StockTwitsComponent;
  let fixture: ComponentFixture<StockTwitsComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ StockTwitsComponent ]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(StockTwitsComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
