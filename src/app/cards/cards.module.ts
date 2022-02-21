import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
//components
import { CardsComponent } from 'src/app/cards/components/cards/cards.component';
import { HeaderComponent } from 'src/app/cards/components/header/header.component';
import { MainComponent } from 'src/app/cards/components/main/main.component';
import { FooterComponent } from 'src/app/cards/components/footer/footer.component';
import { CardComponent } from 'src/app/cards/components/card/card.component';
//services
import { CardsService } from 'src/app/cards/services/cards.service';
import { EnumToArrayPipe } from '../shared/pipes/enumToArray.pipe';

const routes: Routes = [
  {
    path: '',
    component: CardsComponent,
  }
]

@NgModule({
  declarations: [
    CardsComponent,
    HeaderComponent,
    MainComponent,
    FooterComponent,
    CardComponent,
    //shared pipes
    EnumToArrayPipe
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
  ],
  providers:[
    CardsService
  ]
})

export class CardsModule { }
