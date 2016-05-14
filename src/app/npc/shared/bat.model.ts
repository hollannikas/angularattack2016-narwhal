import {Direction} from "../../constants";
import {Character, CharacterType} from "../../shared/character.model";

export class Bat extends Character {
  name:string;
  direction:Direction;

  constructor() {
    super();
    this.type = CharacterType.BAT;
  }

  public changeDirection() {
    switch (this.direction) {
      case Direction.DOWN:
        this.direction = Direction.UP;
        break;
      case Direction.UP:
        this.direction = Direction.DOWN;
        break;
      case Direction.LEFT:
        this.direction = Direction.RIGHT;
        break;
      case Direction.RIGHT:
        this.direction = Direction.LEFT;
        break;
    }
  }
}
