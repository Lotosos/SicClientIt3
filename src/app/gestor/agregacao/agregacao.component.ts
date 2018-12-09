import { Component, OnInit } from '@angular/core';
import { Produto } from '../produto/produto';
import { ProdutoService } from '../produto/produto.service';
import { AgregacaoService } from './agregacao.service';
import { Agregacao } from './agregacao';
import { RestricaoService } from './Restricao.service';
import { Restricao } from './Restricao';

@Component({
  selector: 'app-agregacao',
  templateUrl: './agregacao.component.html',
  styleUrls: ['./agregacao.component.css']
})
export class AgregacaoComponent implements OnInit {

  statusMessage: string;

  criarAgregacoes: boolean = false;
  mostrarAgregacoes: boolean = false;

  allProdutos: Produto[];
  agregacoes: Agregacao[];
  listaRestricoes: Restricao[];
  produtosAgregados: Produto[];

  //toggles mostrar agregacao
  paisfilhos: boolean = true;
  obrigatorioToggle: boolean = true;
  obrigatorioToggleCreate: boolean = true;

  //create agregacao
  selectedProdutoPai: Produto = null;
  selectedProdutoFilho: Produto = null;

  //agregacoes
  selectedProdutoAgregacao: Produto = null;
  selectedProdutoAgregado: Produto = null;
  currentAgregacao: Agregacao = null;
  selectedRestricao: Restricao = null;
  volume: string = "";
  selectedTipoRestricao: string = "";

  constructor(private produtoSrv: ProdutoService, private agregacaoSrv: AgregacaoService, private restricaoSrv: RestricaoService) { }

  ngOnInit() { this.getProdutos(); }
  private getProdutos(): void {
    this.produtoSrv.getProdutos().subscribe(data => {
      console.log(data);
      this.allProdutos = data;
    },
      error => { this.statusMessage = "Error: Service Unavailable"; });
  }
  criarAgregacao() {
    if (this.selectedProdutoFilho != null && this.selectedProdutoPai != null) {
      let produtoIdPai = this.selectedProdutoPai.id;
      let produtoIdFilho = this.selectedProdutoFilho.id;
      let confirmation = this.obrigatorioToggleCreate;
      this.agregacaoSrv.addagregacao({ produtoIdPai, produtoIdFilho, confirmation } as Agregacao).subscribe(data => {
        console.log(data);
        alert("Agregacao Criada");
      });

    } else {
      alert("Escolha ambos o produto pai e o produto filho");
    }
  }

  mudarAgregacao() {
    if (this.currentAgregacao != null) {
      this.currentAgregacao.confirmation = !this.currentAgregacao.confirmation;
      this.agregacaoSrv.updateAgregacao(this.currentAgregacao.produtoIdPai, this.currentAgregacao.produtoIdFilho, this.currentAgregacao)
        .subscribe(data => {
          console.log(data);
          alert("Obrigatoriedade de Agregacao alterada");
        },
          error => { this.statusMessage = "Error: Service Unavailable"; });
    }
  }

  getProdutosFamilia() {
    if (this.selectedProdutoAgregacao == null) return;

    if (this.paisfilhos) {
      this.getProdutosPais(this.selectedProdutoAgregacao.id);
    } else {
      this.getProdutosFilhos(this.selectedProdutoAgregacao.id);
    }
  }

  getProdutosFilhos(id: number) {
    this.produtoSrv.getFilhos(id).subscribe(data => {
      console.log(data);
      this.produtosAgregados = data;
    });
  }

  getProdutosPais(id: number) {
    this.produtoSrv.getPais(id).subscribe(data => {
      console.log(data);
      this.produtosAgregados = data;
    });
  }

  getAgregacaoBool(prod: Produto) {
    if (this.paisfilhos) {
      this.getAgregacao(prod.id, this.selectedProdutoAgregacao.id);
    } else {
      this.getAgregacao(this.selectedProdutoAgregacao.id, prod.id);
    }
    this.getRestricoesId();
  }

  getAgregacao(idPai: number, idFilho: number) {
    this.agregacaoSrv.getAgregacaoId(idPai, idFilho).subscribe(data => {
      console.log(data);
      this.currentAgregacao = data;
      this.obrigatorioToggle = this.currentAgregacao.confirmation;
    });
  }

  selecionarPaisFilhosToggle(bool: boolean) {
    console.log("TRUE " + this.selectedProdutoAgregacao.id);
    if (this.paisfilhos != bool) {
      this.paisfilhos = bool;
      if (this.selectedProdutoAgregacao != null) this.getProdutosFamilia();
    }
  }

  eliminarAgregacao() {
    if (this.currentAgregacao != null) {
      console.log("pai: " + this.currentAgregacao.produtoIdPai + " filho: " + this.currentAgregacao.produtoIdFilho);
      this.agregacaoSrv.deleteAgregacao(this.currentAgregacao.produtoIdPai, this.currentAgregacao.produtoIdFilho)
        .subscribe(data => {
          console.log(data);
          this.getProdutosFamilia();
          this.currentAgregacao = null;
          alert("Agregacao eliminada");
        },
          error => { this.statusMessage = "Error: Service Unavailable"; });
    }
  }
  getRestricoesId() {
    if (this.selectedProdutoAgregacao == null) {
      alert("Selecione produto principal");
      return;
    }
    if (this.selectedProdutoAgregado == null) {
      alert("Selecione produto agregado");
      return;
    }
    if (this.paisfilhos) {
      console.log("Tru");
      this.getRestricoes(this.selectedProdutoAgregado.id, this.selectedProdutoAgregacao.id);

    } else {
      console.log("Fake");
      this.getRestricoes(this.selectedProdutoAgregacao.id, this.selectedProdutoAgregado.id);
    }
  }

  getRestricoes(pai: number, filho: number) {
    this.restricaoSrv.getRestricaoId(pai, filho).subscribe(data => {
      console.log(data);
      this.listaRestricoes = data;
    });
  }

  criarAgregacoesHTML() {
    this.criarAgregacoes = true;
    this.mostrarAgregacoes = false;
  }

  mostrarAgregacoesHTML() {
    this.criarAgregacoes = false;
    this.mostrarAgregacoes = true;
  }

  eliminarRestricao() {
    if (this.selectedRestricao == null) { alert("Escolha os produtos e a restricao a eliminar"); return; }

    this.restricaoSrv.deleteRestricao(this.selectedRestricao.id).subscribe(data => {
      console.log(data);
      alert("Restricao Apagada");
      this.selectedRestricao = null;
      this.getRestricoesId();
    });
  }

  criarRestricao() {
    if (this.selectedProdutoAgregacao == null) {
      alert("Selecione produto principal");
      return;
    }
    if (this.selectedProdutoAgregado == null) {
      alert("Selecione produto agregado");
      return;
    }
    let tipoRes = this.selectedTipoRestricao.trim();
    if (!tipoRes) {
      alert("Selecione um tipo de restricao");
      return;
    }

    let params = this.volume.trim();

    if (!params) {
      alert("Selecione um volume adequado");
      return;
    }
    let produtoProdutoIdPai;
    let produtoProdutoIdFilho;
    if (this.paisfilhos) {
      produtoProdutoIdPai = this.selectedProdutoAgregado.id;
      produtoProdutoIdFilho = this.selectedProdutoAgregacao.id;
    } else {
      produtoProdutoIdPai = this.selectedProdutoAgregacao.id;
      produtoProdutoIdFilho = this.selectedProdutoAgregado.id;
    }

    this.restricaoSrv.addRestricao({tipoRes, params, produtoProdutoIdPai, produtoProdutoIdFilho} as Restricao)
    .subscribe(data => {
      console.log(data);
      alert("Restricao criada");
      this.getRestricoesId();
    });
  }
}
