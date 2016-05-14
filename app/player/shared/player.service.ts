import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {PlayerStatus} from "./player-status.model";
import {Direction} from "../../constants";
import {Location} from "../../shared/location.model";
import "rxjs/add/operator/share";


@Injectable()
export class PlayerService {

  public status$:Observable<PlayerStatus>;

  private statusObserver:any;

  private status:PlayerStatus;

  public location$:Observable<Location>;

  private locationObserver:any;

  private location:Location;

  constructor() {
    this.status$ = new Observable<any>(observer => {
      this.statusObserver = observer;
    }).share();

    this.location$ = new Observable<any>(observer => {
      this.locationObserver = observer;
    }).share();

  }

  public setStartLocation(startLocation:Location) {
    this.location = startLocation;
    this.locationObserver.next(this.location);
  }

  public nextLocation(direction:Direction) {
    let location:Location = new Location();
    location.x = this.location.x;
    location.y = this.location.y;
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
    this.location.x = location.x;
    this.location.y = location.y;
    this.locationObserver.next(this.location);
  }

}
