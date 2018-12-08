import { Component, OnInit } from '@angular/core';
import { Material } from '../material/material';
import { MaterialService } from '../material/material.service';


@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {
  statusMessage: string;

  allMateriais: Material[];
  criarMaterial: boolean = false;
  editarMaterial: boolean = false;
  listarMateriais: boolean = false;

  constructor(private materialSrv: MaterialService) { }
  ngOnInit() { this.getMateriais(); }
  private getMateriais(): void {
    this.materialSrv.getMateriais().subscribe(data => {
      console.log(data);
      this.allMateriais = data;
    },
      error => { this.statusMessage = "Error: Service Unavailable"; });
  }

  criarMaterialHTML() {
    this.criarMaterial = true;
    this.editarMaterial = false;
    this.listarMateriais = false;
  }

  editarMaterialHTML() {
    this.criarMaterial = false;
    this.editarMaterial = true;
    this.listarMateriais = false;
  }

  listarMateriaisHTML() {
    this.criarMaterial = false;
    this.editarMaterial = false;
    this.listarMateriais = true;
  }
}
