import {Character, CharacterType} from "../../shared/character.model";
import {MAX_HP} from '../../constants';

export class Player extends Character {

  name:string;
  coins:number = 0;
  hp:number = 10;
  max_hp:number = 10;

  constructor() {
    super();
    this.type = CharacterType.PLAYER;
  }

}
