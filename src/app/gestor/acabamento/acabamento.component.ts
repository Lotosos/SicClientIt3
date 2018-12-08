import { Component, OnInit } from '@angular/core';
import { Acabamento } from '../acabamento/acabamento';
import { AcabamentoService } from '../acabamento/acabamento.service';


@Component({
  selector: 'app-acabamento',
  templateUrl: './acabamento.component.html',
  styleUrls: ['./acabamento.component.css']
})
export class AcabamentoComponent implements OnInit {
  statusMessage: string;

  allAcabamentos: Acabamento[];
  criarAcabamento: boolean = false;
  editarAcabamento: boolean = false;
  listarAcabamentos: boolean = false;

  constructor(private acabamentoSrv: AcabamentoService) { }
  ngOnInit() { this.getAcabamentos(); }
  private getAcabamentos(): void {
    this.acabamentoSrv.getAcabamentos().subscribe(data => {
      console.log(data);
      this.allAcabamentos = data;
    },
      error => { this.statusMessage = "Error: Service Unavailable"; });
  }

  criarAcabamentoHTML() {
    this.criarAcabamento = true;
    this.editarAcabamento = false;
    this.listarAcabamentos = false;
  }

  editarAcabamentoHTML() {
    this.criarAcabamento = false;
    this.editarAcabamento = true;
    this.listarAcabamentos = false;
  }

  listarAcabamentosHTML() {
    this.criarAcabamento = false;
    this.editarAcabamento = false;
    this.listarAcabamentos = true;
  }
}
