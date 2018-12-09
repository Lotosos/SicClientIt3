import { TestBed } from '@angular/core/testing';

import { AgregacaoService } from './agregacao.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('AgregacaoService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule ],
    schemas: [NO_ERRORS_SCHEMA]}));

  it('should be created', () => {
    const service: AgregacaoService = TestBed.get(AgregacaoService);
    expect(service).toBeTruthy();
  });
});
