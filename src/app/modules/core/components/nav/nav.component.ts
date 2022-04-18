import { Component, OnInit } from '@angular/core';
import { Observable, map } from 'rxjs';
import { CoreService } from '../../services/core.service';
import { PageEnum } from '../../types/page.enum';

@Component({
  selector: 'app-page-nav',
  templateUrl: './nav.component.html',
  //styleUrls: ['./nav.component.css']
})
export class NavComponent {
  activeFilter$: Observable<PageEnum>;

  //used to expose enum values to template
  public get PageEnum(){
    return PageEnum;
  }

  constructor(private coreService: CoreService) {
    this.activeFilter$ = this.coreService.page$.pipe(
      map((page : PageEnum)=>page)
    );
    //active filter
    // this.activeFilter$ = this.coreService.page$.pipe(
    //   map((page) => page)
    // );
  }



  changePage(event: Event, page: PageEnum) : void{
    event.preventDefault();
    this.coreService.changePage(page);
  }

}
