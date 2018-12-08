import { TestBed } from '@angular/core/testing';

import { SicclienteService } from './siccliente.service';

describe('SicclienteService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: SicclienteService = TestBed.get(SicclienteService);
    expect(service).toBeTruthy();
  });
});
