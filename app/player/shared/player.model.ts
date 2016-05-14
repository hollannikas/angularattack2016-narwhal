import {Location} from "../../shared/location.model";

export class Player {
  location:Location;

  checkWallCollision(tile:string, location:Location):boolean {
    console.log(tile);
    let collision = (tile == 'w');
    return collision;
  }

}
