import Card from "./card";
import _ from "lodash";

export default class Deck {
  public heroes: Array<{ card: Card, turn: number }> = [];
  public cards: Array<{ card: Card, quantity: number }> = [];

  public decklist(): { heroes: Array<{ card: Card, turn: number }>, cards: Array<{ card: Card, quantity: number }> } {
    const decklist: { heroes: Array<{ card: Card, turn: number }>, cards: Array<{ card: Card, quantity: number }> } = {
      cards: this.cards,
      heroes: this.heroes
    };

    return decklist;
  }

  public addHero(card: Card, turn: number): boolean {
    if (card.card_type !== "Hero") { return false; }
    if (this.isHeroAddable(this.heroes, card, turn)) { return false; }
    this.heroes.push({card, turn});

    return true;
  }

  public addCard(card: Card): boolean {
    if (card.card_type === "Hero") { return false; }
    if (this.isCardAddable(this.cards, card)) { return false; }

    // if card is addable, then check if index exists if yes, add to it.
    const cardIndex = this.searchStackForCard(this.cards, card);
    if (cardIndex >= 0) {
      this.cards[cardIndex].quantity++;
    } else {
      // otherwise, create a new stack with quantity = 1;
      const quantity = 1;
      this.cards.push({card, quantity});
    }

    return true;
  }

  private isHeroAddable(cardStack: Array < { card: Card, turn: number } > , card: Card , turn: number) {
    // return
    const isAddable = cardStack.find((stack) => {
      if (stack.card.card_id === card.card_id ||  stack.turn === turn) { return false; }
      return true;
    });

    return isAddable;
  }

  private isCardAddable(cardStack: Array < { card: Card, quantity: number } > , card: Card ) {
    const isAddable = cardStack.find((stack) => {
      // if card exists, check quantity
      if (stack.card.card_id === card.card_id) {
        return stack.quantity < 3;
      }

      // if card is not in deck, then it is addable
      return true;
    });

    return isAddable;
  }

  private searchStackForCard(cardStack: Array < { card: Card, quantity: number } >, card: Card ) {
    return cardStack.findIndex((stack) => {
      return stack.card.card_id === card.card_id;
    });
  }

}
