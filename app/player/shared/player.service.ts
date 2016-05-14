import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {PlayerStatus} from "./player-status.model";
import {PlayerLocation} from "./player-location.model";
import {Direction} from "../../constants";
import "rxjs/add/operator/share";


@Injectable()
export class PlayerService {

  public status$:Observable<PlayerStatus>;

  private statusObserver:any;

  private status:PlayerStatus;

  public location$:Observable<PlayerLocation>;

  private locationObserver:any;

  private location:PlayerLocation;

  constructor() {
    this.status$ = new Observable<any>(observer => {
      this.statusObserver = observer;
    }).share();

    this.location$ = new Observable<any>(observer => {
      this.locationObserver = observer;
    }).share();

  }

  public setStartLocation(startLocation:PlayerLocation) {
    this.location = startLocation;
    this.locationObserver.next(this.location);
  }

  public move(direction:Direction) {
    switch (direction) {
      case Direction.DOWN:
        this.location.y++;
        break;
      case Direction.LEFT:
        this.location.x--;
        break;
      case Direction.RIGHT:
        this.location.x++;
        break;
      case Direction.UP:
        this.location.y--;
        break;
    }
    this.locationObserver.next(this.location);
  }

}
