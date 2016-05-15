import {Component} from "@angular/core";
import {ViewportComponent} from "./viewport.component";
import {DungeonMap, DungeonObject, DungeonObjectType} from "./shared/map.model";

@Component({
  selector: 'sv-app',
  templateUrl: './app/app.component.html',
  directives: [ViewportComponent]
})
export class AppComponent {
  /**
   * w = wall
   * f = floor
   * a = abyss
   * p = player
   *
   */

  dungeonMap:DungeonMap = new DungeonMap();

  constructor() {
    // TODO get map from file
    this.dungeonMap.setFloorMap( [
      ['w_cul', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_cur'],
      ['w_a', 'f_cul', 'fu', 'fu', 'fu', 'fu', 'fu', 'fu', 'f_cur', 'w_a'],
      ['w_a', 'fl', 'f', 'f', 'f', 'f', 'f', 'f', 'fr', 'w_a'],
      ['w_a', 'fl', 'f', 'f', 'a', 'f', 'f', 'f', 'fr', 'w_a'],
      ['w_a', 'fl', 'f', 'f', 'a', 'f', 'f', 'f', 'fr', 'w_a'],
      ['w_a', 'fl', 'f', 'f', 'a', 'f', 'f', 'f', 'fr', 'w_a'],
      ['w_a', 'f_cdl', 'fd', 'fd', 'fd', 'fd', 'fd', 'fd', 'f_cdr', 'w_a'],
      ['w_cdl', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_cdr']
    ]);

    this.dungeonMap.objects.push({ type: DungeonObjectType.COIN, location: { x: 3, y: 3} });
    this.dungeonMap.objects.push({ type: DungeonObjectType.COIN, location: { x: 4, y: 1} });
  }

}
