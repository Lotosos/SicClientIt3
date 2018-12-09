import { Component, OnInit, Input } from '@angular/core';
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
  acabamentoToEdit: Acabamento;

  selectedAcabamento: Acabamento = null;
  acabamentoTipoUpdate = "";

  constructor(private acabamentoSrv: AcabamentoService) { }
  ngOnInit() { this.getAcabamentos(); }
  private getAcabamentos(): void {
    this.acabamentoSrv.getAcabamentos().subscribe(data => {
      console.log(data);
      this.allAcabamentos = data;
    },
      error => { this.statusMessage = "Error: Service Unavailable"; });
  }
  
  addAcabamentoHTML(tipo: string): void {
    tipo = tipo.trim();
    if (! tipo) {
      alert ("Tipo de Acabamento vazio"); return;
    }
    if (!tipo) { return; }
    this.acabamentoSrv.addAcabamento({ tipo } as Acabamento)
      .subscribe(acabamento => {
        this.allAcabamentos.push(acabamento);
      });
  }

  selecionarAcabamento(acab: Acabamento) {
    this.acabamentoTipoUpdate = acab.tipo;
  }

  updateAcabamentoHTML(): void {
    if (this.selectedAcabamento == null) {
      alert ("Selecione um Acabamento"); return;
    }
    let acabamentoFinal = new Acabamento;
    acabamentoFinal.id = this.selectedAcabamento.id;
    acabamentoFinal.tipo = this.acabamentoTipoUpdate.trim();
    if (!acabamentoFinal.tipo) {
      alert ("Tipo de Acabamento vazio"); return;
    }
    
    this.acabamentoSrv.updateAcabamento(this.selectedAcabamento.id, acabamentoFinal)
      .subscribe();
      this.getAcabamentos();
      this.acabamentoTipoUpdate = '';
  }

  criarAcabamentoHTML() {
    this.criarAcabamento = true;
    this.editarAcabamento = false;
    this.listarAcabamentos = false;
    this.getAcabamentos();
    this.acabamentoTipoUpdate = '';
  }

  editarAcabamentoHTML() {
    this.criarAcabamento = false;
    this.editarAcabamento = true;
    this.listarAcabamentos = false;
    this.getAcabamentos();
    this.acabamentoTipoUpdate = '';
  }

  listarAcabamentosHTML() {
    this.criarAcabamento = false;
    this.editarAcabamento = false;
    this.listarAcabamentos = true;
    this.getAcabamentos();
    this.acabamentoTipoUpdate = '';
  }

}
