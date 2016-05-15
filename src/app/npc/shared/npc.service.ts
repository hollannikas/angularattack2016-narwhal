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

  public removeNPC(npc:NPC) {
    this.npcs = this.npcs.filter(x => x.name != npc.name);
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
    return npc.getDistanceX(location);
  }

  private getDistanceY(location:Location, npc:NPC):number {
    return npc.getDistanceX(location);
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
