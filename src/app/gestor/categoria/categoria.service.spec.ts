import { TestBed } from '@angular/core/testing';

import { CategoriaService } from './categoria.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('CategoriaService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule ],
    schemas: [NO_ERRORS_SCHEMA]}));

  it('should be created', () => {
    const service: CategoriaService = TestBed.get(CategoriaService);
    expect(service).toBeTruthy();
  });
});
