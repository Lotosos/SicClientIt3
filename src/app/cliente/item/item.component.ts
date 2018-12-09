import { Component, OnInit, Input } from '@angular/core';
import { ProdutoItem } from '../item/item';
import { Acabamento } from '../../gestor/acabamento/acabamento';
import { AcabamentoService } from '../../gestor/acabamento/acabamento.service';
import { Material } from '../../gestor/material/material';
import { MaterialService } from '../../gestor/material/material.service';
import { Produto } from '../../gestor/produto/produto';
import { ProdutoService } from '../../gestor/produto/produto.service';
import { ItemService } from '../item/item.service';


@Component({
  selector: 'app-item',
  templateUrl: './item.component.html',
  styleUrls: ['./item.component.css']
})
export class ItemComponent implements OnInit {
  statusMessage: string;

  allItems: ProdutoItem[];
  allAcabamentos: Acabamento[];
  allProdutos: Produto[];
  allMateriais: Material[];
  allProdutoFilhos: Produto[];
  altura: number;
  largura: number;
  profundidade: number;
  selectedProduto: Produto = null;
  selectedMaterial: Material = null;
  selectedAcabamento: Acabamento = null;
  selectedProdutoFilhos: Produto[] = null;
  criarItem: boolean = false;
  editarItem: boolean = false;
  listarItems: boolean = false;
  apagarItem: boolean = false;

  constructor(private materialSrv: MaterialService, private acabamentoSrv: AcabamentoService, private produtoSrv: ProdutoService, private itemSrv: ItemService) { }
  ngOnInit() { this.getItems();
               this.getProdutos();}
  private getItems(): void {
    this.itemSrv.getItems().subscribe(data => {
      console.log(data);
      this.allItems = data;
    },
      error => { this.statusMessage = "Error: Service Unavailable"; });
  }
  getProdutos(): void {
    this.produtoSrv.getProdutos().subscribe(data => {
      console.log(data);
      this.allProdutos = data;
    },
      error => { this.statusMessage = "Error: Service Unavailable"; });
  }
  getAcabamentos(idMaterial: number): void {
    this.itemSrv.getAcabamentos(idMaterial).subscribe(data => {
      console.log(data);
      this.allAcabamentos = data;
    },
      error => { this.statusMessage = "Error: Service Unavailable"; });
  }
  getMateriais(idProduto: number): void {
    this.itemSrv.getMateriais(idProduto).subscribe(data => {
      console.log(data);
      this.allMateriais = data;
    },
      error => { this.statusMessage = "Error: Service Unavailable"; });
  }
  getProdutoFilhos(idProduto: number): void {
    this.itemSrv.getProdutoFilhos(idProduto).subscribe(data => {
      console.log(data);
      this.allProdutoFilhos = data;
    },
      error => { this.statusMessage = "Error: Service Unavailable"; });
  }
  selecionarProduto(produto: Produto) {
    this.getMateriais(produto.id);
    this.getProdutoFilhos(produto.id);
  }
  selecionarMaterial(material: Material) {
    this.getAcabamentos(material.id);
  }

  criarItemHTML() {
    this.criarItem = true;
    this.editarItem = false;
    this.listarItems = false;
    this.apagarItem = false;
  }

  editarItemHTML() {
    this.criarItem = false;
    this.editarItem = true;
    this.listarItems = false;
    this.apagarItem = false;
  }

  listarItemsHTML() {
    this.criarItem = false;
    this.editarItem = false;
    this.listarItems = true;
    this.apagarItem = false;
  }

  addItemHTML() {
    let altura = this.altura;
    let largura = this.largura;
    let profundidade = this.profundidade;

    if (this.selectedProduto == null) {
      alert ("Escolha um produto"); return;
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
    if (this.selectedMaterial == null) {
      alert ("Escolha um material"); return;
    } 
    if (this.selectedAcabamento == null) {
      alert ("Escolha um acabamento"); return;
    }

    let idProduto = ""+this.selectedProduto.id;
    let idMaterial = ""+this.selectedMaterial.id;
    let idAcabamento = ""+this.selectedAcabamento.id;
    let filhos: string[];
    for (let i in this.selectedProdutoFilhos){
      filhos[i] = ""+this.selectedProdutoFilhos[i];
    }
    this.itemSrv.addItem({ idProduto, altura, largura, profundidade, idMaterial,  idAcabamento, filhos } as ProdutoItem)
      .subscribe(item => {
        this.allItems.push(item);
      });
  }

  deleteItemHTML(_id: string): void {
    //let id = Number(idProd);
    this.itemSrv.deleteItem(_id).subscribe();
    this.allItems = this.allItems.filter(h => h._id != _id);
    alert("Item " + _id + " eliminado.");
  }

}

