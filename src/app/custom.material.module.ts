import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {NgModule } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import { MatFormFieldModule, MatInputModule, MatSelectModule } from '@angular/material';


@NgModule({
  imports: [MatButtonModule, MatCheckboxModule, MatRadioModule, MatFormFieldModule, MatInputModule, MatSelectModule ],
  exports: [MatButtonModule, MatCheckboxModule, MatRadioModule, MatFormFieldModule, MatInputModule, MatSelectModule ],
})
export class customModel { }