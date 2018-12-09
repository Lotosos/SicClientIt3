import { TestBed } from '@angular/core/testing';

import { ProdutoMaterialService } from './produto-material.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('ProdutoMaterialService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule ],
    schemas: [NO_ERRORS_SCHEMA]}));

  it('should be created', () => {
    const service: ProdutoMaterialService = TestBed.get(ProdutoMaterialService);
    expect(service).toBeTruthy();
  });
});
