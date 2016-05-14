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

  public move(direction:Direction) {
    switch (direction) {
      case Direction.DOWN:
        // Handle down
        break;
      case Direction.LEFT:
        // Handle left
        break;
      case Direction.RIGHT:
        // Handle right
        break;
      case Direction.UP:
        // Handle up
        break;
    }
  }

}
