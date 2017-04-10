/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { SpotHeroService } from './spot-hero.service';

describe('SpotHeroService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [SpotHeroService]
    });
  });

  it('should ...', inject([SpotHeroService], (service: SpotHeroService) => {
    expect(service).toBeTruthy();
  }));
});
