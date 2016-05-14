import {Location} from "./location.model";
export enum CharacterType {
  PLAYER,
  BAT,
  SPIDER
}

export abstract class Character {
  type:CharacterType;
  location:Location;
}
