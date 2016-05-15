import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {PlayerStatus} from "./player-status.model";
import {Direction} from "../../constants";
import {Location} from "../../shared/location.model";
import {Player} from "./player.model";
import "rxjs/add/operator/share";


@Injectable()
export class PlayerService {

  public status$:Observable<PlayerStatus>;

  private statusObserver:any;

  private status:PlayerStatus;

  public player$:Observable<Player>;

  private playerObserver:any;

  private player:Player;

  constructor() {
    this.status$ = new Observable<any>(observer => {
      this.statusObserver = observer;
    }).share();

    this.player$ = new Observable<any>(observer => {
      this.playerObserver = observer;
    }).share();

  }

  public setStartLocation(startLocation:Location) {
    if (this.player == null) {
      this.player = new Player();
    }
    this.player.location = startLocation;
    this.playerObserver.next(this.player);
  }

  public setLocation(location:Location) {
    if (this.player == null) {
      this.player = new Player();
    }
    this.player.location = location;
  }

  public nextLocation(direction:Direction) {
    let location:Location = new Location();
    location.x = this.player.location.x;
    location.y = this.player.location.y;
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

  public move(direction:Direction) {
    let location:Location = this.nextLocation(direction);
    this.player.location.x = location.x;
    this.player.location.y = location.y;
    this.playerObserver.next(this.player);
  }

}
