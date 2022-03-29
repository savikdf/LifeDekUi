import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { EnumToArrayPipe } from 'src/app/shared/pipes/enumToArray.pipe';


@NgModule({
  declarations: [
    //shared pipes
    EnumToArrayPipe,
  ],
  imports: [
    CommonModule,
  ],
})

export class SharedPipesModule { }
