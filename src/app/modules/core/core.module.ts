import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule, Routes } from '@angular/router';
//shared
import { SharedPipesModule } from 'src/app/shared/shared.pipes.module';
//components
import { PageComponent } from './components/page/page.component';
//services
import { CoreService } from 'src/app/modules/core/services/core.service';

const routes: Routes = [
  {
    path: '',
    component: PageComponent,
  }
]

@NgModule({
  declarations: [
    PageComponent,
  ],
  imports: [
    CommonModule,
    RouterModule.forChild(routes),
    SharedPipesModule,
  ],
  providers:[
    CoreService
  ]
})

export class CoreModule { }
