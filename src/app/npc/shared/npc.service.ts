import {Injectable} from "@angular/core";
import {Observable} from "rxjs/Observable";
import {Location} from "../../shared/location.model";
import "rxjs/add/operator/share";


@Injectable()
export class NPCService {

  public location$:Observable<Location>;

  private locationObserver:any;

  private location:Location;

  constructor() {

    this.location$ = new Observable<any>(observer => {
      this.locationObserver = observer;
    }).share();

  }

  public setStartLocation(startLocation:Location) {
    this.location = startLocation;
    this.locationObserver.next(this.location);
  }

  public move(location:Location) {
    this.location.x = location.x;
    this.location.y = location.y;
    this.locationObserver.next(this.location);
  }

}
