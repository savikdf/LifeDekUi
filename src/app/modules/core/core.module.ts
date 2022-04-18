import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
//shared
import { SharedPipesModule } from 'src/app/shared/shared.pipes.module';
//components
import { CardsModule } from 'src/app/cards/cards.module';
import { PageComponent } from './components/page/page.component';
//services
import { CoreService } from 'src/app/modules/core/services/core.service';
import { NavComponent } from './components/nav/nav.component';
import { MainComponent } from './components/main/main.component';
import { FooterComponent } from './components/footer/footer.component';
import { HeaderComponent } from './components/header/header.component';

const routes: Routes = [
  {
    path: '',
    component: PageComponent,
  }
]

@NgModule({
  declarations: [
    PageComponent,
    NavComponent,
    MainComponent,
    FooterComponent,
    HeaderComponent,
  ],
  imports: [
    CardsModule,
    CommonModule,
    RouterModule.forChild(routes),
    SharedPipesModule,
  ],
  providers:[
    CoreService
  ]
})

export class CoreModule { }
