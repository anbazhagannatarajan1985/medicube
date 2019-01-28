import { TestBed } from '@angular/core/testing';

import { KartServiceService } from './kart-service.service';

describe('KartServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: KartServiceService = TestBed.get(KartServiceService);
    expect(service).toBeTruthy();
  });
});
