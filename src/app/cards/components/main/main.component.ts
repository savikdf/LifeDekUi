import { Component } from '@angular/core';
import { combineLatest, map, Observable } from 'rxjs';
import { CardsService } from '../../services/cards.service';
import { CardInterface } from '../../types/card.interface';
import { FilterEnum } from '../../types/filter.enum';

@Component({
  selector: 'app-cards-main',
  templateUrl: './main.component.html',
  // styleUrls: ['./main.component.css']
})
export class MainComponent {
  visibleCards$: Observable<CardInterface[]>;
  noCardsClass$: Observable<boolean>;
  isAllCardsSelected$: Observable<boolean>;

  constructor(private cardService: CardsService) {
    this.isAllCardsSelected$ = this.cardService.cards$.pipe(
      map((cards) => cards.every((card) => card.isCompleted))
    );

    //hiding main component if no cards exist
    this.noCardsClass$ = this.cardService.cards$.pipe(
      map((cards) => cards.length === 0)
    );

    //filtering cards based on filter enum
    this.visibleCards$ = combineLatest(
      this.cardService.cards$,
      this.cardService.filter$
    ).pipe(
      map(([cards, filter]: [CardInterface[], FilterEnum]) => {
        //console.log('combine', cards, filter);
        if (filter === FilterEnum.active) {
          return cards.filter((card) => !card.isCompleted);
        } else if (filter == FilterEnum.completed) {
          return cards.filter((card) => card.isCompleted);
        }
        return cards;
      })
    );
  }

  toggleAllCards(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.cardService.toggleAllCompleted(target.checked);
  }

}
