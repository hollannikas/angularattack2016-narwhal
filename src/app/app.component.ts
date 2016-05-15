import {Component} from "@angular/core";
import {ViewportComponent} from "./viewport.component";
import {DungeonMap, DungeonObjectType} from "./shared/map.model";
import {Direction} from "./constants";
import {Bat} from "./npc/shared/bat.model";
import {Spider} from "./npc/shared/spider.model";

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

  dungeonMap:DungeonMap[] = new DungeonMap();

  constructor() {
    // TODO get map from file
    this.dungeonMap.setFloorMap([
      ['w_cul', 'w_b', 'w_b', 'w_b', 'w_b', 'door', 'w_b', 'w_b', 'w_b', 'w_cur'],
      ['w_a', 'f_cul', 'fu', 'fu', 'fu', 'fu', 'fu', 'fu', 'f_cur', 'w_a'],
      ['w_a', 'fl', 'f', 'f', 'f', 'f', 'f', 'f', 'fr', 'w_a'],
      ['w_a', 'fl', 'f', 'f', 'a', 'f', 'f', 'f', 'fr', 'w_a'],
      ['w_a', 'fl', 'f', 'f', 'a', 'f', 'f', 'f', 'fr', 'w_a'],
      ['w_a', 'fl', 'f', 'f', 'a', 'f', 'f', 'f', 'fr', 'w_a'],
      ['w_a', 'f_cdl', 'fd', 'fd', 'fd', 'fd', 'fd', 'fd', 'f_cdr', 'w_a'],
      ['w_cdl', 'w_b', 'w_b', 'w_b', 'w_b', 'door_open', 'w_b', 'w_b', 'w_b', 'w_cdr']
    ]);

    this.dungeonMap.objects.push({type: DungeonObjectType.COIN, location: {x: 3, y: 3}});
    this.dungeonMap.objects.push({type: DungeonObjectType.COIN, location: {x: 4, y: 1}});

    const bat = new Bat();
    bat.location = {x: 5, y: 4};
    bat.direction = Direction.LEFT;
    bat.name = "Bobby Bat";

    const spider = new Spider();
    spider.location = {x: 4, y: 2};
    spider.direction = Direction.UP;
    spider.name = "Sammy Spider";

    this.dungeonMap.npcs.push(bat);
    this.dungeonMap.npcs.push(spider);

  }

}
