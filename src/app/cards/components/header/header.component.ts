import { Component } from '@angular/core';
import { CardsService } from 'src/app/cards/services/cards.service';

@Component({
  selector: 'app-cards-header',
  templateUrl: './header.component.html',
  // styleUrls: ['./header.component.css']
})
export class HeaderComponent {

  constructor(private cardService: CardsService){
    //subscribe to cardService cards array
    // this.cardService.cards$.subscribe(cards => {
    //   console.log('cards', cards)
    // });
  }
  cardName: string = '';

  changeNewCardName(event: Event): void {
    const target = event.target as HTMLInputElement;
    this.cardName = target.value;
  }

  addCard(): void {
    // console.log(`Adding new Card: "${this.cardName}"`);
    this.cardService.addCard(this.cardName);
    this.cardName = ``; //reset input string
  }
}
