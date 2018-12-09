import { TestBed } from '@angular/core/testing';

import { MaterialService } from './material.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('MaterialService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule ],
    schemas: [NO_ERRORS_SCHEMA]}));

  it('should be created', () => {
    const service: MaterialService = TestBed.get(MaterialService);
    expect(service).toBeTruthy();
  });
});
