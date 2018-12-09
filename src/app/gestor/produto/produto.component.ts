import { Component, OnInit } from '@angular/core';
import { Produto } from './produto';
import { Categoria } from '../categoria/categoria';
import { ProdutoService } from './produto.service';
import { CategoriaService } from '../categoria/categoria.service';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  statusMessage: string;

  allProdutos: Produto[];
  allCategorias: Categoria[];
  criarProduto: boolean = false;
  editarProduto: boolean = false;
  listarProdutos: boolean = false;
  selectedProduto: Produto = null;
  selectedCategoria: Categoria = null;
  nomeUpdate:string = "";
  alturaUpdate:string = "";
  larguraUpdate:string = "";
  profundidadeUpdate:string = "";
  selectedCategoriaCreate: Categoria = null;


  constructor(private produtoSrv: ProdutoService, private categoriaSrv: CategoriaService) { }
  ngOnInit() { this.getProdutos(); this.getCategorias()}
  private getProdutos(): void {
    this.produtoSrv.getProdutos().subscribe(data => {
      console.log(data);
      this.allProdutos = data;
    },
      error => { this.statusMessage = "Error: Service Unavailable"; });
  }

  private getCategorias(): void {
    this.categoriaSrv.getCategorias().subscribe(data => {
      console.log(data);
      this.allCategorias = data;
    },
      error => { this.statusMessage = "Error: Service Unavailable"; });
  }
  addProdutoHTML(nome : string, altura :  string, largura: string, profundidade: string): void {
    nome = nome.trim();
    altura = altura.trim();
    largura = largura.trim();
    let categoria = this.selectedCategoriaCreate;
    profundidade = profundidade.trim();

    if (!nome) {
      alert ("Nome vazio"); return;
    }
    if (!altura) {
      alert ("Altura vazio"); return;
    }
    if (!largura) {
      alert ("Pargura vazio"); return;
    }
    if (!profundidade) {
      alert ("Profundidade vazio"); return;
    }
    if (categoria == null) {
      alert ("Escolha uma categoria"); return;
    } 

    this.produtoSrv.addProduto({ nome, categoria, altura, largura, profundidade } as Produto)
      .subscribe(produto => {
        this.allProdutos.push(produto);
      });
      alert("Foi Criado um Produto");
  }

  deleteProdutoHTML(id: number): void {
    //let id = Number(idProd);
    this.produtoSrv.deleteProduto(id).subscribe();
    this.allProdutos = this.allProdutos.filter(h => h.id != id);
    alert("Produto " + id + " eliminado.");
  }

  selecionarProduto(prod) {
    /**/
    this.selectedProduto = prod;
    this.nomeUpdate = prod.nome;
    this.alturaUpdate = prod.altura;
    this.larguraUpdate = prod.largura;
    this.profundidadeUpdate = prod.profundidade;
    let cat = null;
    if(prod.categoria != null) {
      for (let i = 0; i < this.allCategorias.length; i++) {
        if(prod.categoria.id == this.allCategorias[i].id) cat = this.allCategorias[i];
      }
    }
    this.selecionarCategoria(cat);
    if(prod != null){
      console.log(this.selectedProduto.nome);
    }/* */
    
  }

  selecionarCategoria(cat)  
  {
    this.selectedCategoria = cat;
  }  
  selecionarCategoriaCreate(cat)
  {this.selectedCategoriaCreate = cat;

  }
  
  criarProdutoHTML() {
    this.criarProduto = true;
    this.editarProduto = false;
    this.listarProdutos = false;
  }

  editarProdutoHTML() {
    this.criarProduto = false;
    this.editarProduto = true;
    this.listarProdutos = false;
  }

  listarProdutosHTML() {
    this.criarProduto = false;
    this.editarProduto = false;
    this.listarProdutos = true;
  }
}
