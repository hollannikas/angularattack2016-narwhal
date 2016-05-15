import {Component, ViewChild} from "@angular/core";
import {ViewportComponent} from "./viewport.component";
import {DungeonMap, DungeonObjectType, DungeonObject} from "./shared/map.model";
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
  private victory:boolean = false;
  private defeat:boolean = false;

  availableCoins:number = 0;

  @ViewChild(ViewportComponent)
  viewportComponent:ViewportComponent;

  constructor() {
    // TODO get map from file
    this.initDungeon();
  }

  initDungeon() {
    this.dungeonMaps = [];

    const dungeonMap:DungeonMap = new DungeonMap();
    dungeonMap.setFloorMap([
      ['w_cul', 'w_b', 'w_b', 'w_b', 'f', 'w_b', 'w_b', 'w_b', 'w_b', 'w_cur'],
      ['w_a', 'f_cul', 'fu', 'fu', 'fu', 'fu', 'fu', 'fu', 'f_cur', 'w_a'],
      ['w_a', 'fl', 'f', 'f', 'f', 'f', 'f', 'f', 'fr', 'w_a'],
      ['w_a', 'fl', 'f', 'f', 'al', 'ar', 'f', 'f', 'fr', 'w_a'],
      ['w_a', 'fl', 'f', 'f', 'al', 'ar', 'f', 'f', 'fr', 'w_a'],
      ['w_a', 'fl', 'f', 'f', 'al', 'ar', 'f', 'f', 'fr', 'w_a'],
      ['w_a', 'f_cdl', 'fd', 'fd', 'fd', 'fd', 'fd', 'fd', 'f_cdr', 'w_a'],
      ['w_cdl', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_cdr']
    ]);

    dungeonMap.objects.push({type: DungeonObjectType.COIN, location: {x: 3, y: 3}});
    dungeonMap.objects.push({type: DungeonObjectType.COIN, location: {x: 4, y: 1}});

    dungeonMap.objects.push({type: DungeonObjectType.CORRIDOR, location: {x: 4, y: 0}});
    dungeonMap.playerEntryLocation = {x: 4, y: 0};

    const bat = new Bat();
    bat.location = {x: 5, y: 4};
    bat.direction = Direction.LEFT;
    bat.name = "Bobby Bat";

    const spider = new Spider();
    spider.location = {x: 6, y: 2};
    spider.direction = Direction.UP;
    spider.name = "Sammy Spider";

    dungeonMap.npcs.push(bat);
    dungeonMap.npcs.push(spider);

    const dungeonMap2:DungeonMap = new DungeonMap();
    dungeonMap2.setFloorMap([
      ['w_cul', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_cur'],
      ['w_a', 'f_cul', 'fu', 'fu', 'fu', 'fu', 'fu', 'fu', 'f_cur', 'w_a'],
      ['w_a', 'fl', 'f', 'f', 'f', 'f', 'f', 'f', 'fr', 'w_a'],
      ['w_a', 'al', 'a', 'a', 'ar', 'f', 'al', 'a', 'ar', 'w_a'],
      ['w_a', 'fl', 'f', 'f', 'f', 'f', 'f', 'f', 'fr', 'w_a'],
      ['w_a', 'fl', 'f', 'f', 'f', 'f', 'f', 'f', 'fr', 'w_a'],
      ['w_a', 'f_cdl', 'fd', 'fd', 'fd', 'fd', 'fd', 'fd', 'f_cdr', 'w_a'],
      ['w_cdl', 'w_b', 'w_b', 'w_b', 'f', 'w_b', 'w_b', 'w_b', 'w_b', 'w_cdr']
    ]);

    dungeonMap2.objects.push({type: DungeonObjectType.COIN, location: {x: 1, y: 1}});
    dungeonMap2.objects.push({type: DungeonObjectType.COIN, location: {x: 8, y: 1}});

    dungeonMap2.objects.push({type: DungeonObjectType.CORRIDOR, location: {x: 4, y: 7}});
    dungeonMap2.playerEntryLocation = {x: 4, y: 7};

    const zoe = new Bat();
    zoe.location = {x: 5, y: 4};
    zoe.direction = Direction.LEFT;
    zoe.name = "Zoe the Bat";

    const bertrand = new Bat();
    bertrand.location = {x: 4, y: 2};
    bertrand.direction = Direction.DOWN;
    bertrand.name = "Bertrand Bat";

    const itsy = new Spider();
    itsy.location = {x: 1, y: 1};
    itsy.direction = Direction.RIGHT;
    itsy.name = "Itsy";

    const bitsy = new Spider();
    bitsy.location = {x: 7, y: 2};
    bitsy.direction = Direction.LEFT;
    bitsy.name = "Sammy Spider";

    dungeonMap2.npcs.push(bertrand);
    dungeonMap2.npcs.push(zoe);
    dungeonMap2.npcs.push(itsy);
    dungeonMap2.npcs.push(bitsy);

    this.dungeonMaps.push(dungeonMap);
    this.dungeonMaps.push(dungeonMap2);

    this.dungeonMaps.forEach((map:DungeonMap) => {
      map.objects.forEach((dungeonObject:DungeonObject) => {
        if (dungeonObject.type == DungeonObjectType.COIN) {
          this.availableCoins++;
        }
      });
    });
    
  }

  ngOnInit() {
    var audio = new Audio();
    audio.src = "app/resources/mainLoop.mp3";
    audio.loop = true;
    audio.load();
    audio.play();
  }

  changeMap($event) {
    if (this.selectedMap == 0) {
      this.selectedMap = 1;
    } else if (this.selectedMap == 1) {
      this.selectedMap = 0;
    }
  }

  toggleModal(modal:boolean) {
    console.log(modal);
    this.modal = modal;
  }

  toggleVictoryModal(modal:boolean) {
    console.log("victory!")
    this.victory = modal;
    this.viewportComponent.restartGame();
    this.initDungeon();
    this.selectedMap = 0;
  }

  toggleDefeatModal(modal:boolean) {
    console.log("defeat!")
    this.defeat = modal;
    this.viewportComponent.restartGame();
    this.initDungeon();
    this.selectedMap = 0;
  }


}
