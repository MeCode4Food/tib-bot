import _ from "lodash";

export class Deck {

    public heroes = Array<HeroStack>();
    public cards = Array<CardStack>();
    public items = Array<ItemStack>();
    public name: string;

    constructor(object: any) {
        this.name = object.name || "";
        _.forEach(object.heroes, (hero) => this.heroes.push(hero));
        _.forEach(object.cards, (card) => this.heroes.push(card));
        _.forEach(object.items, (item) => this.heroes.push(item));
    }
}

/* tslint:disable:max-classes-per-file variable-name */
class HeroStack {
    public id: number;
    public turn: number;
    public card_id: number;
    public card_name: string;
    public card_text: string | null;
    public card_image: string | null;
    public colour: string;
    public rarity: string;
    public signature_id: number | null;
    public parent_id: number | null;
    public passive_id: number | null;
    public active_id: number | null;
    public reference_id: number | null;
    public attack: number | null;
    public armour: number | null;
    public hit_points: number | null;
    public mana_cost: number | null;
    public gold_cost: number | null;
    public card_icon: string | null;

    constructor(object: any) {
        this.id = object.id;
        this.turn = object.turn;
        this.card_id = object.card_id;
        this.card_name = object.card_name;
        this.card_text = object.card_text ? object.card_text : null;
        this.card_image = object.card_image ? object.card_image : null;
        this.colour = object.colour;
        this.rarity = object.rarity;
        this.signature_id = object.signature_id ? object.signature_id : null;
        this.parent_id = object.parent_id ? object.parent_id : null;
        this.passive_id = object.passive_id ? object.passive_id : null;
        this.active_id = object.active_id ? object.active_id : null;
        this.reference_id = object.reference_id ? object.reference_id : null;
        this.attack = object.attack ? object.attack : null;
        this.armour = object.armour ? object.armour : null;
        this.hit_points = object.hit_points ? object.hit_points : null;
        this.mana_cost = object.mana_cost ? object.mana_cost : null;
        this.gold_cost = object.gold_cost ? object.gold_cost : null;
        this.card_icon = object.card_icon ? object.card_icon : null;
    }
}

class CardStack {
    public id: number;
    public card_id: number;
    public card_name: string;
    public card_text: string | null;
    public card_image: string | null;
    public colour: string;
    public rarity: string;
    public signature_id: number | null;
    public parent_id: number | null;
    public parent_name: string | null;
    public parent_type: string | null;
    public passive_id: number | null;
    public active_id: number | null;
    public reference_id: number | null;
    public attack: number | null;
    public armour: number | null;
    public hit_points: number | null;
    public mana_cost: number | null;
    public gold_cost: number | null;
    public count: number | null;

    constructor(object: any) {
        this.id = object.id;
        this.card_id = object.card_id;
        this.card_name = object.card_name;
        this.card_text = object.card_text ? object.card_text : null;
        this.card_image = object.card_image ? object.card_image : null;
        this.colour = object.colour;
        this.rarity = object.rarity;
        this.signature_id = object.signature_id ? object.signature_id : null;
        this.parent_id = object.parent_id ? object.parent_id : null;
        this.parent_name = object.parent_name ? object.parent_name : null;
        this.parent_type = object.parent_type ? object.parent_type : null;
        this.passive_id = object.passive_id ? object.passive_id : null;
        this.active_id = object.active_id ? object.active_id : null;
        this.reference_id = object.reference_id ? object.reference_id : null;
        this.attack = object.attack ? object.attack : null;
        this.armour = object.armour ? object.armour : null;
        this.hit_points = object.hit_points ? object.hit_points : null;
        this.mana_cost = object.mana_cost ? object.mana_cost : null;
        this.gold_cost = object.gold_cost ? object.gold_cost : null;
        this.count = object.count ? object.count : null;
    }
}

class ItemStack extends CardStack {

    constructor(object: any) {
        super(object);
    }
}
