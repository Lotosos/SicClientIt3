import {MatButtonModule, MatCheckboxModule} from '@angular/material';
import {NgModule } from '@angular/core';
import {MatRadioModule} from '@angular/material/radio';
import { MatFormFieldModule, MatInputModule } from '@angular/material';
import {MatListModule} from '@angular/material/list';
import {MatSelectModule} from '@angular/material/select';
import { FormsModule } from '@angular/forms';
import {MatSlideToggleModule} from '@angular/material/slide-toggle';
import {MatDialogModule} from '@angular/material/dialog';

@NgModule({
  imports: [MatDialogModule,MatSlideToggleModule, FormsModule, MatListModule, MatButtonModule, MatCheckboxModule, MatRadioModule, MatFormFieldModule, MatInputModule, MatSelectModule ],
  exports: [MatDialogModule,MatSlideToggleModule, FormsModule, MatListModule, MatButtonModule, MatCheckboxModule, MatRadioModule, MatFormFieldModule, MatInputModule, MatSelectModule ],
})
export class customModel { }