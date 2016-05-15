import {Character} from "../../shared/character.model";
import {Direction} from "../../constants";
import {Location} from "../../shared/location.model";
import {Tile} from "../../shared/map.model";

export abstract class NPC extends Character {
  name:string;
  direction:Direction;
  abstract changeDirection();
  abstract nextLocation():Location;
  checkCollision(nextTile:Tile):boolean;

  public move() {
    let nextLocation = this.nextLocation();
    this.location.x = nextLocation.x;
    this.location.y = nextLocation.y;
  }

}
