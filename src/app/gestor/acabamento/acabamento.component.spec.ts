import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AcabamentoComponent } from './acabamento.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('AcabamentoComponent', () => {
  let component: AcabamentoComponent;
  let fixture: ComponentFixture<AcabamentoComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AcabamentoComponent ],
      imports: [HttpClientModule ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AcabamentoComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
