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
      ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
      ['w', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'w'],
      ['w', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'w'],
      ['w', 'f', 'f', 'f', 'a', 'f', 'f', 'f', 'f', 'w'],
      ['w', 'f', 'f', 'f', 'a', 'f', 'f', 'f', 'f', 'w'],
      ['w', 'f', 'f', 'f', 'a', 'f', 'f', 'f', 'f', 'w'],
      ['w', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'w'],
      ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w']
    ];
    const coin = new DungeonObject();
    coin.location = { x: 3, y: 3};
    this.dungeonMap.objects.push(coin);
  }

}
