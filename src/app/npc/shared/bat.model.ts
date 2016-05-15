import {CharacterType} from "../../shared/character.model";
import {NPC} from "./npc.model";
import {Direction} from "../../constants";
import {Location} from "../../shared/location.model";
import {Tile, DungeonObjectType} from "../../shared/map.model";

export class Bat extends NPC {

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

  public nextLocation():Location {
    let location:Location = new Location();
    location.x = this.location.x;
    location.y = this.location.y;
    switch (this.direction) {
      case Direction.DOWN:
        location.y++;
        break;
      case Direction.LEFT:
        location.x--;
        break;
      case Direction.RIGHT:
        location.x++;
        break;
      case Direction.UP:
        location.y--;
        break;
    }
    return location;
  }

  checkCollision(nextTile:Tile):boolean {
    return nextTile.className.startsWith('w');
  }
}
