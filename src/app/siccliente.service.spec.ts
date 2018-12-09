import { TestBed } from '@angular/core/testing';

import { SicclienteService } from './siccliente.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('SicclienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule ],
    schemas: [NO_ERRORS_SCHEMA]}));

  it('should be created', () => {
    const service: SicclienteService = TestBed.get(SicclienteService);
    expect(service).toBeTruthy();
  });
});
