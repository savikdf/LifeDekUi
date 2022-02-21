import { Component, Input, Output, EventEmitter, OnInit, ViewChild, ElementRef, OnChanges, SimpleChanges } from '@angular/core';
import { CardsService } from '../../services/cards.service';
import { CardInterface } from '../../types/card.interface';

@Component({
  selector: 'app-cards-card',
  templateUrl: './card.component.html',
  // styleUrls: ['./card.component.css']
})
export class CardComponent implements OnInit, OnChanges {
  @Input('card') cardProps: CardInterface
  @Input('isEditing') isEditingProps: boolean
  @Output('setEditingId') setEditingIdEvent : EventEmitter<
    string | null
  > = new EventEmitter();

  editingText : string = ``;
  @ViewChild(`textInput`) textInput : ElementRef;

  ngOnInit(): void {
    this.editingText = this.cardProps.name;
  }

  ngOnChanges(changes: SimpleChanges): void {
    if(changes['isEditingProps'].currentValue){
      setTimeout(() => {
        this.textInput.nativeElement.focus();
      }, 0);
    }
  }

  constructor(private cardService : CardsService){

  }

  //#region Managing Card Methods

    toggleCompleted() : void{
      this.cardService.toggleCardCompleted(this.cardProps.id);
    }

    removeCard() : void{
      this.cardService.removeCard(this.cardProps.id);
    }

  //#endregion

  //#region Editing Methods

    //double clicking card label sets editing mode
    setCardEditMode() : void{
      this.setEditingIdEvent.emit(this.cardProps.id);
    }

    //setting editing text on keyup
    changeName(event:Event) : void{
      const target = event.target as HTMLInputElement;
      this.editingText = target.value;
    }

    updateCard() : void{
      this.cardService.updateCard(this.cardProps.id, this.editingText);

      //closes editing element
      this.setEditingIdEvent.emit(null);
    }

  //#endregion

}
