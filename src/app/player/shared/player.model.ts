import {Character, CharacterType} from "../../shared/character.model";

export class Player extends Character {

  name:string;
  coins:number = 0;
  hp:number = 3;
  max_hp:number = 3;

  constructor() {
    super();
    this.type = CharacterType.PLAYER;
  }

}
