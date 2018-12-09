import { TestBed } from '@angular/core/testing';

import { ProdutoService } from './produto.service';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('ProdutoService', () => {
  beforeEach(() => TestBed.configureTestingModule({imports: [HttpClientModule ],
    schemas: [NO_ERRORS_SCHEMA]}));

  it('should be created', () => {
    const service: ProdutoService = TestBed.get(ProdutoService);
    expect(service).toBeTruthy();
  });
});
