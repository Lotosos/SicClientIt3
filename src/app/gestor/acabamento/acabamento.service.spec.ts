import { TestBed } from '@angular/core/testing';

import { AcabamentoService } from './acabamento.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('AcabamentoService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule ],
    schemas: [NO_ERRORS_SCHEMA]}));

  it('should be created', () => {
    const service: AcabamentoService = TestBed.get(AcabamentoService);
    expect(service).toBeTruthy();
  });
});

