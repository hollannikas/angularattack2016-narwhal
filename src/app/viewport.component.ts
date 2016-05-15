import {Component, Input, HostListener} from "@angular/core";
import {TileComponent} from "./tile.component";
import {Key, Direction} from "./constants";
import {PlayerService} from "./player/shared/player.service";
import {Location} from "./shared/location.model";
import {NPCService} from "./npc/shared/npc.service";
import {Bat} from "./npc/shared/bat.model";
import {Player} from "./player/shared/player.model";
import {DungeonMap, Tile} from "./shared/map.model";
import {NPC} from "./npc/shared/npc.model";
import {Spider} from "./npc/shared/spider.model";

@Component({
  selector: 'sv-viewport',
  templateUrl: 'app/viewport.component.html',
  styleUrls: ['app/viewport.component.css'],
  directives: [TileComponent]
})
export class ViewportComponent {

  // TODO we start out with a single room map, should be multiple rooms
  @Input()
  map:DungeonMap;

  private player:Player;

  private npcs:NPC[];

  constructor(private playerService:PlayerService, private npcService:NPCService) {

  }

  ngOnInit() {
    console.log("ngOnInit ViewportComponent")

    this.playerService.player$.subscribe(p => {
      this.player = p;
    });

    this.restartGame();
  }

  getMap():Tile[][] {
    let viewport = [];
    // deep copy
    this.map.floorLayer.forEach((row) => {
      let targetRow = [];
      row.forEach((originalTile) => {
        const copyTile = new Tile();
        copyTile.className = originalTile.className;
        targetRow.push(copyTile);
      });
      viewport.push(targetRow);
    });

    this.drawPlayer(viewport);
    this.drawNPCs(viewport);
    this.drawObjects(viewport, this.map);
    return viewport;
  }


  drawObjects(viewport:Tile[][], map:DungeonMap) {
//    console.log("Map " + map);
    map.objects.forEach((object) => {
      // TODO map string from ObjectType enum
      viewport[object.location.x][object.location.y].object = object;
    });
  }

  restartGame() {
    this.playerService.setStartLocation({x: 1, y: 1});
    // TODO add reset on service?
    this.npcService.reset();

    this.npcService.npc$.subscribe(l => {
      this.npcs = l;
    });

    const bat = new Bat();
    bat.location = {x: 5, y: 4};
    bat.direction = Direction.LEFT;
    bat.name = "Bobby Bat";
    this.npcService.addNpc(bat);

    const spider = new Spider();
    spider.location = {x: 4, y: 2};
    spider.direction = Direction.UP;
    spider.name = "Sammy Spider";
    this.npcService.addNpc(spider);
  }

  drawPlayer(viewport:Tile[][]) {
    viewport[this.player.location.y][this.player.location.x].hasPlayer = true;
  }

  drawNPCs(viewport:Tile[][]) {
    this.npcs.forEach((npc) => {
      viewport[npc.location.y][npc.location.x].npc = npc;
    })
  }

  checkPlayerWallCollision(location:Location):boolean {
    const nextTile = this.map.floorLayer[location.y][location.x];
    let collision = nextTile.className.startsWith('w')
      || nextTile.className == 'a';
    if (collision) {
      console.log("Damn wall!")
    }
    return collision;
  }


  checkPlayerNPCCollision() {
    this.npcs.forEach((npc) => {
      if (npc.location.x == this.player.location.x
        && npc.location.y == this.player.location.y) {
        return true;
      }
    })
    return false;
  }

  canPlayerSelectNPC() {
    //this.npcs.forEach((npc) => {
      //if(npc.location.x == this.player.location.x && npc.location){

      //}
    //});
  }
  
  moveNPCs() {
    this.npcs.forEach((npc) => {
      const nextTileLocation = this.npcService.nextLocation(npc.direction, npc);
      const nextTile = this.map.floorLayer[nextTileLocation.y][nextTileLocation.x];
      if (npc.checkCollision(nextTile)) {
        this.npcService.changeDirection(npc);
      }
      this.npcService.move(npc);
    });
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event:KeyboardEvent) {
    event.preventDefault();
    var playerMoved = false;
    switch (event.keyCode) {
      case Key.ARROW_DOWN:
        if (!this.checkPlayerWallCollision(this.playerService.nextLocation(Direction.DOWN))) {
          this.playerService.move(Direction.DOWN);
          playerMoved = true;
        }
        break;
      case Key.ARROW_UP:
        if (!this.checkPlayerWallCollision(this.playerService.nextLocation(Direction.UP))) {
          this.playerService.move(Direction.UP);
          playerMoved = true;
        }
        break;
      case Key.ARROW_LEFT:
        if (!this.checkPlayerWallCollision(this.playerService.nextLocation(Direction.LEFT))) {
          this.playerService.move(Direction.LEFT);
          playerMoved = true;
        }
        break;
      case Key.ARROW_RIGHT:
        if (!this.checkPlayerWallCollision(this.playerService.nextLocation(Direction.RIGHT))) {
          this.playerService.move(Direction.RIGHT);
          playerMoved = true;
        }
        break;
      case Key.SPACE:
        console.log("Fire!!!");
        break;
      // this.playerService.trigger();
      case Key.ENTER:
        console.log("This probably does something");
        break;
      // this.playerService.??();
    }
    if (this.canPlayerSelectNPC()) {

    } else if (playerMoved) {
      this.moveNPCs();
      if (this.checkPlayerNPCCollision()) {
        alert("Arrrrgh! I am DEAD.");
        this.restartGame();
      }
    }

  }
}
