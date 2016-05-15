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

  selectedMap:number = 0;
  dungeonMaps:DungeonMap[] = [];
  private modal:boolean = false;

  constructor() {
    // TODO get map from file
    const dungeonMap:DungeonMap = new DungeonMap();
    dungeonMap.setFloorMap([
      ['w_cul', 'w_b', 'w_b', 'w_b', 'f', 'w_b', 'w_b', 'w_b', 'w_b', 'w_cur'],
      ['w_a', 'f_cul', 'fu', 'fu', 'fu', 'fu', 'fu', 'fu', 'f_cur', 'w_a'],
      ['w_a', 'fl', 'f', 'f', 'f', 'f', 'f', 'f', 'fr', 'w_a'],
      ['w_a', 'fl', 'f', 'f', 'a', 'f', 'f', 'f', 'fr', 'w_a'],
      ['w_a', 'fl', 'f', 'f', 'a', 'f', 'f', 'f', 'fr', 'w_a'],
      ['w_a', 'fl', 'f', 'f', 'a', 'f', 'f', 'f', 'fr', 'w_a'],
      ['w_a', 'f_cdl', 'fd', 'fd', 'fd', 'fd', 'fd', 'fd', 'f_cdr', 'w_a'],
      ['w_cdl', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_cdr']
    ]);

    dungeonMap.objects.push({type: DungeonObjectType.COIN, location: {x: 3, y: 3}});
    dungeonMap.objects.push({type: DungeonObjectType.COIN, location: {x: 4, y: 1}});

    dungeonMap.objects.push({type: DungeonObjectType.CORRIDOR, location: {x: 4, y: 0}});
    const bat = new Bat();
    bat.location = {x: 5, y: 4};
    bat.direction = Direction.LEFT;
    bat.name = "Bobby Bat";

    const spider = new Spider();
    spider.location = {x: 4, y: 2};
    spider.direction = Direction.UP;
    spider.name = "Sammy Spider";

    dungeonMap.npcs.push(bat);
    dungeonMap.npcs.push(spider);

    const dungeonMap2:DungeonMap = new DungeonMap();
    dungeonMap2.setFloorMap([
      ['w_cul', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_cur'],
      ['w_a', 'f_cul', 'fu', 'fu', 'fu', 'fu', 'fu', 'fu', 'f_cur', 'w_a'],
      ['w_a', 'fl', 'f', 'f', 'f', 'f', 'f', 'f', 'fr', 'w_a'],
      ['w_a', 'fl', 'f', 'f', 'a', 'f', 'f', 'f', 'fr', 'w_a'],
      ['w_a', 'fl', 'f', 'f', 'a', 'f', 'f', 'f', 'fr', 'w_a'],
      ['w_a', 'fl', 'f', 'f', 'a', 'f', 'f', 'f', 'fr', 'w_a'],
      ['w_a', 'f_cdl', 'fd', 'fd', 'fd', 'fd', 'fd', 'fd', 'f_cdr', 'w_a'],
      ['w_cdl', 'w_b', 'w_b', 'w_b', 'f', 'w_b', 'w_b', 'w_b', 'w_b', 'w_cdr']
    ]);

    dungeonMap2.objects.push({type: DungeonObjectType.COIN, location: {x: 3, y: 3}});
    dungeonMap2.objects.push({type: DungeonObjectType.COIN, location: {x: 4, y: 1}});

    dungeonMap2.objects.push({type: DungeonObjectType.CORRIDOR, location: {x: 4, y: 7}});
    const bertrand = new Bat();
    bertrand.location = {x: 5, y: 4};
    bertrand.direction = Direction.LEFT;
    bertrand.name = "Bertrand Bat";

    const sophia = new Bat();
    sophia.location = {x: 4, y: 2};
    sophia.direction = Direction.UP;
    sophia.name = "Sophia Spider";

    dungeonMap2.npcs.push(bertrand);
    dungeonMap2.npcs.push(sophia);

    this.dungeonMaps.push(dungeonMap);
    this.dungeonMaps.push(dungeonMap2);
  }

  changeMap($event) {
    if (this.selectedMap == 0) {
      this.selectedMap = 1;
    } else if (this.selectedMap == 1) {
      this.selectedMap = 0;
    }
    console.log("Map changed");
  }
  
  toggleModal(modal:boolean) {
    console.log(modal);
    this.modal = modal;
  }


}
