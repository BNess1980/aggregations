/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { ParkWhizService } from './park-whiz.service';

describe('ParkWhizService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [ParkWhizService]
    });
  });

  it('should ...', inject([ParkWhizService], (service: ParkWhizService) => {
    expect(service).toBeTruthy();
  }));
});
