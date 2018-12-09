import { Component, OnInit } from '@angular/core';
import { Categoria } from '../categoria/categoria';
import { CategoriaService } from '../categoria/categoria.service';

 
@Component({
  selector: 'app-categoria',
  templateUrl: './categoria.component.html',
  styleUrls: ['./categoria.component.css']
})
export class CategoriaComponent implements OnInit {
  statusMessage: string;

  allCategorias: Categoria[];
  criarCategoria: boolean = false;
  editarCategoria: boolean = false;
  listarCategorias: boolean = false;
  categoriaToEdit: Categoria;

  selectedCategoria: Categoria = null;
  categoriaDescricaoUpdate = "";

  constructor(private categoriaSrv: CategoriaService) { }
  ngOnInit() { this.getCategorias(); }
  private getCategorias(): void {
    this.categoriaSrv.getCategorias().subscribe(data => {
      console.log(data);
      this.allCategorias = data;
    },
      error => { this.statusMessage = "Error: Service Unavailable"; });
  }

  addCategoriaHTML(descricao: string): void {
    descricao = descricao.trim();
    if (! descricao) {
      alert ("Descricao vazia"); return;
    }
    alert("Foi Criada um Categoria");
    if (!descricao) { return; }
    this.categoriaSrv.addCategoria({ descricao } as Categoria)
      .subscribe(categoria => {
        this.allCategorias.push(categoria);
      });
  }

  selecionarCategoria(cat : Categoria){
    this.categoriaDescricaoUpdate = cat.descricao;
  }

  updateCategoriaHTML(): void {
    if (this.selectedCategoria == null) {
      alert ("Selecione uma Categoria"); return;
    }

    let categoriaFinal = new Categoria;
    categoriaFinal.id = this.selectedCategoria.id;
    categoriaFinal.descricao = this.categoriaDescricaoUpdate.trim();
    if (!categoriaFinal.descricao) {
      alert ("Descrição de Categoria vazia"); return;
    }
    
    this.categoriaSrv.updateCategoria(this.selectedCategoria.id, categoriaFinal)
      .subscribe();
      this.getCategorias();
      this.categoriaDescricaoUpdate = '';
  }

  criarCategoriaHTML() {
    this.criarCategoria = true;
    this.editarCategoria = false;
    this.listarCategorias = false;
    this.getCategorias();
    this.categoriaDescricaoUpdate = '';
  }

  editarCategoriaHTML() {
    this.criarCategoria = false;
    this.editarCategoria = true;
    this.listarCategorias = false;
    this.getCategorias();
    this.categoriaDescricaoUpdate = '';
  }

  listarCategoriasHTML() {
    this.criarCategoria = false;
    this.editarCategoria = false;
    this.listarCategorias = true;
    this.getCategorias();
    this.categoriaDescricaoUpdate = '';
  }
}

