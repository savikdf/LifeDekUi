import { Component } from '@angular/core';
import { combineLatest, combineLatestAll, combineLatestWith, map, Observable } from 'rxjs';
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
  editingId: string | null = null;

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
        let result: CardInterface[]

        //filtering logic
        if (filter === FilterEnum.active) {
          result = cards.filter((card) => !card.isCompleted);
        } else if (filter == FilterEnum.completed) {
          result = cards.filter((card) => card.isCompleted);
        }else{
          result = cards;
        }

        //sorted by completed state, then by create date
        result.sort((a,b)=> a.createDate > b.createDate ? 1 : -1);

        return result;
      })
    );
  }

  toggleAllCards(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.cardService.toggleAllCompleted(target.checked);
  }

  setEditingId(editingId : string | null): void{
    this.editingId = editingId;
  }

}
