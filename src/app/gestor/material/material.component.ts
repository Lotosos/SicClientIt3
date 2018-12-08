import { Component, OnInit } from '@angular/core';
import { Material } from '../material/material';
import { MaterialService } from '../material/material.service';

@Component({
  selector: 'app-material',
  templateUrl: './material.component.html',
  styleUrls: ['./material.component.css']
})
export class MaterialComponent implements OnInit {

  allMateriais: Material[];
  constructor(private materialSrv: MaterialService) { }
  ngOnInit() { this.getMateriais(); }
  private getMateriais(): void {
    this.materialSrv.getMateriais().subscribe(data => {
      console.log(data);
      this.allMateriais = data;
    });
  }
}
