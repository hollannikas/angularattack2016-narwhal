import {Character, CharacterType} from "../../shared/character.model";

export class Player extends Character {

  constructor() {
    super();
    this.type = CharacterType.PLAYER;
  }

}
