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

  constructor(private cardService: CardsService){

    this.visibleCards$ = combineLatest(
      this.cardService.cards$,
      this.cardService.filter$
    ).pipe(
      map(([cards, filter]: [CardInterface[], FilterEnum])=>{
        //filtering cards based on filter enum
        //console.log('combine', cards, filter);
        if(filter === FilterEnum.active){
          return cards.filter(card => !card.isCompleted)
        }else if(filter == FilterEnum.completed){
          return cards.filter(card => card.isCompleted)
        }
        return cards;
      })
    );

  }



}
