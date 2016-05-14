import {Direction} from "../../constants";
import {Location} from "../../shared/location.model";

export class Bat {
  name:string;
  direction:Direction;
  location:Location;

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
