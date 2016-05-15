import {Location} from "./location.model";
export enum CharacterType {
  PLAYER,
  BAT,
  SPIDER
}

export abstract class Character {
  type:CharacterType;
  location:Location;
  hp:number = 1;

  isDead():boolean {
    return this.hp < 1;
  }
}
