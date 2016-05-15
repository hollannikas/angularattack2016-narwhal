import {Character, CharacterType} from "../../shared/character.model";

export class Player extends Character {

  coins:number = 0;

  constructor() {
    super();
    this.type = CharacterType.PLAYER;
  }

}
