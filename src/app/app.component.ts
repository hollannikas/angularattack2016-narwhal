import {Component} from "@angular/core";
import {ViewportComponent} from "./viewport.component";
import {DungeonMap, DungeonObject} from "./shared/map.model";

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
    this.dungeonMap.floorLayer = [
      ['w_cul', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_cur'],
      ['w_a', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'w_a'],
      ['w_a', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'w_a'],
      ['w_a', 'f', 'f', 'f', 'a', 'f', 'f', 'f', 'f', 'w_a'],
      ['w_a', 'f', 'f', 'f', 'a', 'f', 'f', 'f', 'f', 'w_a'],
      ['w_a', 'f', 'f', 'f', 'a', 'f', 'f', 'f', 'f', 'w_a'],
      ['w_a', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'w_a'],
      ['w_cdl', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_cdr']
    ];
    const coin = new DungeonObject();
    coin.location = { x: 3, y: 3};
    this.dungeonMap.objects.push(coin);
  }

}
