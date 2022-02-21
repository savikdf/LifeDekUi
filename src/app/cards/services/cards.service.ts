import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { CardInterface } from '../types/card.interface';
import { FilterEnum } from '../types/filter.enum';

@Injectable()
export class CardsService {
  cards$ = new BehaviorSubject<CardInterface[]>([]);
  filter$ = new BehaviorSubject<FilterEnum>(FilterEnum.active);

  addCard(cardName: string): void {
    const newCard: CardInterface={
      name: cardName,
      id: Math.random().toString(16), //needs to be a GUID
      createDate: new Date(),
      isCompleted: false,
      description: "",
    }
    const updatedCards = [...this.cards$.getValue(), newCard];
    this.cards$.next(updatedCards);
  }

  changeFilter(filter : FilterEnum) : void{
    if(filter === this.filter$.value){
      return
    }
    this.filter$.next(filter);
  }

  toggleAllCompleted(isCompleted : boolean) : void{
    const updatedCards = this.cards$.getValue().map(card => {
      return{
        ...card,
        isCompleted : isCompleted
      }
    });
    this.cards$.next(updatedCards);
  }

  //#region Card Update Methods

    updateCard(id : string, name : string):void{
      const updatedCards = this.cards$.getValue().map(card => {
        if(card.id !== id){
          return card;
        }
        return {...card, name : name};
      });
      this.cards$.next(updatedCards);
    }

    toggleCardCompleted(id : string) : void{
      const updatedCards = this.cards$.getValue().map(card => {
        if(card.id === id){
          return {...card, isCompleted : !card.isCompleted};
        }
        return card;
      });
      this.cards$.next(updatedCards);
    }

    removeCard(id : string):void{
      const updatedCards = this.cards$.getValue().filter(card => card.id !== id);
      this.cards$.next(updatedCards);
    }

  //#endregion


}
