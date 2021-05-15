import { TestBed, inject } from '@angular/core/testing';

import { PlateDetailsService } from './plate-details.service';

describe('PlateDetailsService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [PlateDetailsService]
    });
  });

  it('should be created', inject([PlateDetailsService], (service: PlateDetailsService) => {
    expect(service).toBeTruthy();
  }));
});
