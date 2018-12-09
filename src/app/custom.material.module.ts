import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {NgModule } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';

@NgModule({
  imports: [FormsModule, MatListModule, MatButtonModule, MatCheckboxModule, MatRadioModule, MatFormFieldModule, MatInputModule, MatSelectModule ],
  exports: [FormsModule, MatListModule, MatButtonModule, MatCheckboxModule, MatRadioModule, MatFormFieldModule, MatInputModule, MatSelectModule ],
})
export class customModel { }