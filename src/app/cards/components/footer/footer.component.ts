import { Component } from '@angular/core';
import { map, Observable, observable } from 'rxjs';
import { CardsService } from '../../services/cards.service';
import { FilterEnum } from '../../types/filter.enum';

@Component({
  selector: 'app-cards-footer',
  templateUrl: './footer.component.html',
  // styleUrls: ['./footer.component.css']
})
export class FooterComponent{
  noCardsClass$: Observable<boolean>;
  activeCount$: Observable<number>;
  activeCountLabel$ : Observable<string>;
  filterEnum : FilterEnum;

  constructor(private cardService: CardsService) {
    //hiding main component if no cards exist
    this.noCardsClass$ = this.cardService.cards$.pipe(
      map((cards) => cards.length === 0)
    );

    //active counter
    this.activeCount$ = this.cardService.cards$.pipe(
      map((cards) => cards.filter(card => !card.isCompleted).length)
    );

    //active counter label
    this.activeCountLabel$ = this.activeCount$.pipe(
      map((activeCount) => `Card${activeCount !== 1 ? 's' : ''} Left`)
    );
  }

  changeFilter(event: Event, filter : FilterEnum) : void{
    event.preventDefault();
    this.cardService.changeFilter(filter);
  }


}
