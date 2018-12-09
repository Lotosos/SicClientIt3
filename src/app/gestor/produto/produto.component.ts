import { Component, OnInit } from '@angular/core';
import { Produto } from './produto';
import { Categoria } from '../categoria/categoria';
import { Material } from '../material/material';
import { ProdutoService } from './produto.service';
import { CategoriaService } from '../categoria/categoria.service';
import { MaterialService } from '../material/material.service';
import { ProdutoMaterialService } from './produto-material.service';
import { ProdutoMaterial } from './Produto-Material';

@Component({
  selector: 'app-produto',
  templateUrl: './produto.component.html',
  styleUrls: ['./produto.component.css']
})
export class ProdutoComponent implements OnInit {

  statusMessage: string;

  //lists
  allProdutos: Produto[];
  allCategorias: Categoria[];
  allMateriais: Material[];
  ownedMateriais:Material[];
  
  

  //view toggles
  criarProduto: boolean = false;
  editarProduto: boolean = false;
  listarProdutos: boolean = false;
  adicionarMateriais:boolean = false;
  
  

  //update
  selectedProduto: Produto = null;
  selectedCategoria: Categoria = null;
  nomeUpdate:string = "";
  alturaUpdate:string = "";
  larguraUpdate:string = "";
  profundidadeUpdate:string = "";

  //create
  selectedCategoriaCreate: Categoria = null;

  //definir materiais
  selectedProdutoMaterial: Produto = null;
  selectedNewMaterial: Material = null;
  selectedOwnedMaterial: Material = null;



  constructor(private produtoSrv: ProdutoService, private categoriaSrv: CategoriaService, 
      private materialSrv: MaterialService, private produtoMaterialSrv: ProdutoMaterialService) { }
  
  ngOnInit() { this.getProdutos();}
  
  private getProdutos(): void {
    this.produtoSrv.getProdutos().subscribe(data => {
      console.log(data);
      this.allProdutos = data;
    },
      error => { this.statusMessage = "Error: Service Unavailable"; });
  }

  private getMateriais(): void {
    this.materialSrv.getMateriais().subscribe(data => {
      console.log(data);
      this.allMateriais = data;
    },
      error => { this.statusMessage = "Error: Service Unavailable"; });
    
  }
  getMateriaisProduto() {
    if(this.selectedProdutoMaterial!=null){
      this.produtoSrv.getMateriais(this.selectedProdutoMaterial.id).subscribe(data => {
        console.log(data);
        this.ownedMateriais = data;
      },
        error => { this.statusMessage = "Error: Service Unavailable"; });
    }else{
      alert("Escolha um Produto");
    }
  }

  private getCategorias(): void {
    this.categoriaSrv.getCategorias().subscribe(data => {
      console.log(data);
      this.allCategorias = data;
    },
      error => { this.statusMessage = "Error: Service Unavailable"; });
  }

  updateProdutoHTML(nome: string, altura:  string, largura: string, profundidade: string) {
    nome = this.nomeUpdate.trim();
    altura = this.alturaUpdate.trim();
    largura = this.larguraUpdate.trim();
    profundidade = this.profundidadeUpdate.trim();

    if (this.selectedCategoria == null) {
      alert ("Escolha uma categoria"); return;
    }
    if (this.selectedProduto == null) {
      alert("Escolha um produto"); return;
    }

    let id = this.selectedProduto.id;
    let categoria = this.selectedCategoria;

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

    this.produtoSrv.updateProduto(id, { id, nome, categoria, altura, largura, profundidade } as Produto)
      .subscribe();
      this.getProdutos();
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
    this.produtoSrv.deleteProduto(id).subscribe(data => {
      console.log(data);
      this.allProdutos = this.allProdutos.filter(h => h.id != id);
      alert("Produto " + id + " eliminado.");
    });
    
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

  selecionarCategoria(cat) {
    this.selectedCategoria = cat;
  }  
  selecionarCategoriaCreate(cat) {
    this.selectedCategoriaCreate = cat;
  }


  eliminarMaterial() {
    if(this.selectedProdutoMaterial == null) {alert("Escolha um produto"); return;};
    if(this.selectedOwnedMaterial == null) {alert("Escolha um Material"); return;};
    let produtoId = this.selectedProdutoMaterial.id;
    let materialId = this.selectedOwnedMaterial.id;
    this.produtoMaterialSrv.deleteProdutoMaterial(produtoId, materialId)
    .subscribe(data => {
      console.log(data);
      this.getMateriaisProduto();
      this.selectedOwnedMaterial = null;
      alert("Material Eliminado");
    },
      error => { this.statusMessage = "Error: Service Unavailable"; });
  }

  adicionarmaterial() {
    if(this.selectedProdutoMaterial == null) {alert("Escolha um produto"); return;};
    if(this.selectedNewMaterial == null) {alert("Escolha um Material"); return;};
    let produtoId = this.selectedProdutoMaterial.id;
    let materialId = this.selectedNewMaterial.id;
    this.produtoMaterialSrv.addProdutoMaterial({produtoId, materialId} as ProdutoMaterial)
    .subscribe(data => {
      console.log(data);
      this.getMateriaisProduto();
      alert("Material Adicionado");
      
    },
      error => { this.statusMessage = "Error: Service Unavailable"; });
  }
  criarProdutoHTML() {
    this.criarProduto = true;
    this.editarProduto = false;
    this.listarProdutos = false;
    this.adicionarMateriais = false;
    this.getProdutos();
    this.getCategorias();
    this.allMateriais=null;
  }

  editarProdutoHTML() {
    this.criarProduto = false;
    this.editarProduto = true;
    this.listarProdutos = false;
    this.adicionarMateriais = false;
    this.getProdutos();
    this.getCategorias();
    this.allMateriais=null;
  }

  listarProdutosHTML() {
    this.criarProduto = false;
    this.editarProduto = false;
    this.listarProdutos = true;
    this.adicionarMateriais = false;
    this.getProdutos();
    this.allCategorias=null;
    this.allMateriais=null;
  }
  adicionarMateriaisHTML(){
    this.criarProduto = false;
    this.editarProduto = false;
    this.listarProdutos = false;
    this.adicionarMateriais = true;
    this.getProdutos();
    this.allCategorias=null;
    this.getMateriais()
  }
}
