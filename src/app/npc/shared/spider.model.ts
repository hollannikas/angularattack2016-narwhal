import {CharacterType} from "../../shared/character.model";
import {NPC} from "./npc.model";
import {Direction} from "../../constants";

export class Spider extends NPC {

  constructor() {
    super();
    this.type = CharacterType.SPIDER;
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
