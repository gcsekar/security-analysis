import { TestBed, inject } from '@angular/core/testing';

import { StocktwitService } from './stocktwit.service';

describe('StocktwitService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [StocktwitService]
    });
  });

  it('should ...', inject([StocktwitService], (service: StocktwitService) => {
    expect(service).toBeTruthy();
  }));
});
