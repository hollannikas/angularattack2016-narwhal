import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Location} from "../../shared/location.model";
import {Bat} from "./bat.model";
import {Direction} from "../../constants";
import "rxjs/add/operator/share";


@Injectable()
export class NPCService {

  public npc$:Observable<Bat>;

  private npcObserver:any;

  private npc:Bat;

  constructor() {

    this.npc$ = new Observable<any>(observer => {
      this.npcObserver = observer;
    }).share();

  }

  public addBat(bat:Bat) {
    this.npc = bat;
    this.npcObserver.next(this.npc);
  }

  public nextFollowLocation(location:Location):Location {
    let distanceX = this.getDistanceX(location);
    let distanceY = this.getDistanceY(location);
    if (distanceX < distanceY) {
      // move Y
      if (this.npc.location.y > location.y) {
        location.y++;
      } else {
        location.y--;
      }
    } else {
      // move X also moves x if
      if (this.npc.location.y > location.y) {
        location.y++;
      } else {
        location.y--;
      }
    }
    return location;
  }

  private getDistanceX(location:Location):number {
    let distanceX:number;
    if (this.npc.location.x > location.x) {
      distanceX = this.npc.location.x - location.x;
    } else {
      distanceX = location.x - this.npc.location.x;
    }
    return distanceX;
  }

  private getDistanceY(location:Location):number {
    let distanceY:number;
    if (this.npc.location.y > location.y) {
      distanceY = this.npc.location.y - location.y;
    } else {
      distanceY = location.y - this.npc.location.y;
    }
    return distanceY;
  }

  public nextLocation(direction:Direction) {
    let location:Location = new Location();
    location.x = this.npc.location.x;
    location.y = this.npc.location.y;
    switch (direction) {
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

  public changeDirection() {
    this.npc.changeDirection();
  }

  public move() {
    let location:Location = this.nextLocation(this.npc.direction);
    this.npc.location.x = location.x;
    this.npc.location.y = location.y;
    this.npcObserver.next(this.npc);
  }

}
