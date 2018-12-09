import { TestBed } from '@angular/core/testing';

import { RestricaoService } from './restricao.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('RestricaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule ],
    schemas: [NO_ERRORS_SCHEMA]}));

  it('should be created', () => {
    const service: RestricaoService = TestBed.get(RestricaoService);
    expect(service).toBeTruthy();
  });
});
