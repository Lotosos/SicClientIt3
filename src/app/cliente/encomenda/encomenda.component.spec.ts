import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EncomendaComponent } from './encomenda.component';
import { NO_ERRORS_SCHEMA } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

describe('EncomendaComponent', () => {
  let component: EncomendaComponent;
  let fixture: ComponentFixture<EncomendaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EncomendaComponent ],
      imports: [HttpClientModule ],
      schemas: [NO_ERRORS_SCHEMA]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EncomendaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
