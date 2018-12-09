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
  materialToEdit: Material;

  selectedMaterial: Material = null;
  materialTipoUpdate = "";

  constructor(private materialSrv: MaterialService) { }
  ngOnInit() { this.getMateriais(); }
  private getMateriais(): void {
    this.materialSrv.getMateriais().subscribe(data => {
      console.log(data);
      this.allMateriais = data;
    },
      error => { this.statusMessage = "Error: Service Unavailable"; });
  }

  addMaterialHTML(tipo: string): void {
    tipo = tipo.trim();
    if (!tipo) {
      alert("Tipo do Material vazio"); return;
    }
    alert("Foi Criado um Material");
    if (!tipo) { return; }
    this.materialSrv.addMaterial({ tipo } as Material)
      .subscribe(material => {
        this.allMateriais.push(material);
      });
  }

  selecionarMaterial(mat: Material) {
    this.materialTipoUpdate = mat.tipo;
  }

  updateMaterialHTML(tipo: string, idAlterar: string): void {
    if (this.selectedMaterial == null) {
      alert("Selecione um Material"); return;
    }

    let materialFinal = new Material;
    materialFinal.id = this.selectedMaterial.id;
    materialFinal.tipo = this.materialTipoUpdate.trim();
    if (!materialFinal.tipo) {
      alert("Tipo de Material vazio"); return;
    }

    this.materialSrv.updateMaterial(this.selectedMaterial.id, materialFinal)
      .subscribe();
    this.getMateriais();
    this.materialTipoUpdate = '';
  
}

criarMaterialHTML() {
  this.criarMaterial = true;
  this.editarMaterial = false;
  this.listarMateriais = false;
  this.getMateriais();
  this.materialTipoUpdate = '';
}

editarMaterialHTML() {
  this.criarMaterial = false;
  this.editarMaterial = true;
  this.listarMateriais = false;
  this.getMateriais();
  this.materialTipoUpdate = '';
}

listarMateriaisHTML() {
  this.criarMaterial = false;
  this.editarMaterial = false;
  this.listarMateriais = true;
  this.getMateriais();
  this.materialTipoUpdate = '';
}
}
