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

  constructor(private categoriaSrv: CategoriaService) { }
  ngOnInit() { this.getCategorias(); }
  private getCategorias(): void {
    this.categoriaSrv.getCategorias().subscribe(data => {
      console.log(data);
      this.allCategorias = data;
    },
      error => { this.statusMessage = "Error: Service Unavailable"; });
  }

  criarCategoriaHTML() {
    this.criarCategoria = true;
    this.editarCategoria = false;
    this.listarCategorias = false;
  }

  editarCategoriaHTML() {
    this.criarCategoria = false;
    this.editarCategoria = true;
    this.listarCategorias = false;
  }

  listarCategoriasHTML() {
    this.criarCategoria = false;
    this.editarCategoria = false;
    this.listarCategorias = true;
  }
}

