/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { BestParkingService } from './best-parking.service';

describe('BestParkingService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [BestParkingService]
    });
  });

  it('should ...', inject([BestParkingService], (service: BestParkingService) => {
    expect(service).toBeTruthy();
  }));
});
