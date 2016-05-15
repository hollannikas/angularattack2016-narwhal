import {Character, CharacterType} from "../../shared/character.model";

export class Player extends Character {

  name:string;
  coins:number = 0;
  hp:number = 10;

  constructor() {
    super();
    this.type = CharacterType.PLAYER;
  }

}
