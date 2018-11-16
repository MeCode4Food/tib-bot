export default class Card {
  /* tslint:disable:variable-name */
  public card_id: number;
  public card_name: string;
  public card_type: string;
  public card_text: string;
  public card_image: string;
  public rarity: string;
  public signature_id: number;
  public parent_id: number;
  public passive_id: number;
  public active_id: number;
  public reference_id: number;
  public attack: number;
  public armour: number;
  public hit_points: number;
  public mana_cost: number;
  public gold_cost: number;
  public signature_name: string;
  public signature_text: string;
  public passive_name: string;
  public passive_text: string;
  public parent_name: string;
  public parent_type: string;

  constructor(object: any) {
    this.card_id     = object.card_id;
    this.card_name   = object.card_name;
    this.card_type   = object.card_type;
    this.card_text   = object.card_text;
    this.card_image  = object.card_image;
    this.rarity = object.rarity;

    // card relations
    this.signature_id = object.signature_id;
    this.parent_id = object.parent_id;
    this.passive_id = object.passive_id;
    this.active_id = object.active_id;
    this.reference_id = object.reference_id;

    this.signature_name = object.signature_name ? object.signature_name : null;
    this.signature_text = object.signature_text ? object.signature_text : null;
    this.passive_name = object.passive_name ? object.passive_name : null;
    this.passive_text = object.passive_text ? object.passive_text : null;
    this.parent_name = object.parent_name ? object.parent_name : null;
    this.parent_type = object.parent_type ? object.parent_type : null;

    // card stats
    this.attack = object.attack;
    this.armour = object.armor;
    this.hit_points = object.hit_points;
    this.mana_cost = object.mana_cost;
    this.gold_cost = object.gold_cost;
  }
}
