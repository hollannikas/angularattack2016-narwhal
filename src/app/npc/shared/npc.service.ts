import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Location} from "../../shared/location.model";
import {Direction} from "../../constants";
import "rxjs/add/operator/share";
import {NPC} from "./npc.model";


@Injectable()
export class NPCService {

  public npc$:Observable<NPC[]>;

  private npcObserver:any;

  private npcs:NPC[] = [];

  constructor() {

    this.npc$ = new Observable<any>(observer => {
      this.npcObserver = observer;
    }).share();

  }

  public reset() {
    this.npcs = [];
  }

  public addNpc(npc:NPC) {
    this.npcs.push(npc);
    this.npcObserver.next(this.npcs);
  }

  public nextFollowLocation(location:Location, npc:NPC):Location {
    let distanceX = this.getDistanceX(location, npc);
    let distanceY = this.getDistanceY(location, npc);
    if (distanceX < distanceY) {
      // move Y
      if (npc.location.y > location.y) {
        location.y++;
      } else {
        location.y--;
      }
    } else {
      // move X also moves x if
      if (npc.location.y > location.y) {
        location.y++;
      } else {
        location.y--;
      }
    }
    return location;
  }

  private getDistanceX(location:Location, npc:NPC):number {
    
    let distanceX:number;
    if (npc.location.x > location.x) {
      distanceX = npc.location.x - location.x;
    } else {
      distanceX = location.x - npc.location.x;
    }
    return distanceX;
  }

  private getDistanceY(location:Location, npc:NPC):number {
    let distanceY:number;
    if (npc.location.y > location.y) {
      distanceY = npc.location.y - location.y;
    } else {
      distanceY = location.y - npc.location.y;
    }
    return distanceY;
  }

  public nextLocation(direction:Direction, npc:NPC) {
    return npc.nextLocation();
  }

  public changeDirection(npc:NPC) {
    npc.changeDirection();
  }

  public move(npc:NPC) {
    npc.move();
    this.npcObserver.next(this.npcs);
  }
}
