/* tslint:disable:no-unused-variable */

import { TestBed, async, inject } from '@angular/core/testing';
import { MerchantsService } from './merchants.service';

describe('MerchantsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MerchantsService]
    });
  });

  it('should ...', inject([MerchantsService], (service: MerchantsService) => {
    expect(service).toBeTruthy();
  }));
});
