import {Component, Input, HostListener} from "@angular/core";
import {TileComponent} from "./tile.component";
import {Key, Direction} from "./constants";
import {PlayerService} from "./player/shared/player.service";
import {Location} from "./shared/location.model";
import {NPCService} from "./npc/shared/npc.service";
import {Player} from "./player/shared/player.model";
import {DungeonMap, Tile} from "./shared/map.model";
import {NPC} from "./npc/shared/npc.model";

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

  private objectiveReached:boolean = false;

  constructor(private playerService:PlayerService, private npcService:NPCService) {

  }

  ngOnInit() {
    console.log("ngOnInit ViewportComponent")

    this.playerService.player$.subscribe(p => {
      this.player = p;
      if (!this.isPlayerCloseToNPC()) {
        // TODO maybe onlystop moveing selected NPC
        this.moveNPCs();
      }
      this.handleObjectCollsions();
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
    this.drawNPCs(viewport, this.map);
    this.drawObjects(viewport, this.map);
    return viewport;
  }


  drawObjects(viewport:Tile[][], map:DungeonMap) {
//    console.log("Map " + map);
    map.objects.forEach((object) => {
      // TODO map string from ObjectType enum
      viewport[object.location.y][object.location.x].object = object;
    });
  }

  restartGame() {
    this.playerService.setStartLocation({x: 1, y: 1});
    // TODO add reset on service?
    this.npcService.reset();

    this.npcService.npc$.subscribe(l => {
      this.npcs = l;
      console.log("UPDATE");
      if (this.checkPlayerNPCCollision()) {
        console.log("Arrrrgh! I am DEAD.");

        //this.restartGame();
      }
    });

    this.map.npcs.forEach(x => {
      this.npcService.addNpc(x);
    });

  }

  drawPlayer(viewport:Tile[][]) {
    viewport[this.player.location.y][this.player.location.x].hasPlayer = true;
  }

  drawNPCs(viewport:Tile[][], map:DungeonMap) {
    map.npcs.forEach((object) => {
      // TODO map string from ObjectType enum
      viewport[object.location.y][object.location.x].npc = object;
    });
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
    let collision:boolean = false;
    this.npcs.forEach((npc) => {
      if (npc.location.x === this.player.location.x
        && npc.location.y === this.player.location.y) {
        collision = true;
        return;
      }
    });
    return collision;
  }

  isPlayerCloseToNPC() {
    return this.getNPCCloseToPlayer() != null;
  }

  getNPCCloseToPlayer():NPC {
    if (this.npcs) {
      let selectedNPC:NPC = null;
      this.npcs.forEach((npc) => {
        if (npc.location.y == this.player.location.y && npc.getDistanceX(this.player.location) == 1) {
          selectedNPC = npc;
          return;
        } else if (npc.location.x == this.player.location.x && npc.getDistanceY(this.player.location) == 1) {
          selectedNPC = npc;
          return;
        }
      });
      return selectedNPC;
    }
    return null;
  }

  handleObjectCollsions() {
    this.map.objects.forEach((dungeonObject) => {
      if (dungeonObject.location.x == this.player.location.x && dungeonObject.location.y == this.player.location.y) {
        switch (dungeonObject.type) {
          case 0:
            console.log("Found a coin!");
            this.player.coins++;
            this.map.removeObject(dungeonObject);
            // TODO play coin sound!
            break;
          default:
            console.log("Unhandled object " + dungeonObject.type);
        }
      }
    });

    // Check if map objective has been reached
    var coinsLeft = false;
    this.map.objects.forEach((dungeonObject) => {
      if (dungeonObject.type == 0) {
        coinsLeft = true;
      }
    });
    this.objectiveReached = !coinsLeft;
  }

  moveNPCs() {
    if (this.npcs) {
      this.npcs.forEach((npc) => {
        const nextTileLocation = this.npcService.nextLocation(npc.direction, npc);
        const nextTile = this.map.floorLayer[nextTileLocation.y][nextTileLocation.x];
        if (npc.checkCollision(nextTile)) {
          this.npcService.changeDirection(npc);
        }
        this.npcService.move(npc);
      });

    }
  }

  removeNPC(npc:NPC) {
    this.map.removeNPC(npc);
    this.npcService.removeNPC(npc);
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event:KeyboardEvent) {
    event.preventDefault();
    switch (event.keyCode) {
      case Key.ARROW_DOWN:
        if (!this.checkPlayerWallCollision(this.playerService.nextLocation(Direction.DOWN))) {
          this.playerService.move(Direction.DOWN);
        }
        break;
      case Key.ARROW_UP:
        if (!this.checkPlayerWallCollision(this.playerService.nextLocation(Direction.UP))) {
          this.playerService.move(Direction.UP);
        }
        break;
      case Key.ARROW_LEFT:
        if (!this.checkPlayerWallCollision(this.playerService.nextLocation(Direction.LEFT))) {
          this.playerService.move(Direction.LEFT);
        }
        break;
      case Key.ARROW_RIGHT:
        if (!this.checkPlayerWallCollision(this.playerService.nextLocation(Direction.RIGHT))) {
          this.playerService.move(Direction.RIGHT);
        }
        break;
      case Key.SPACE:
        console.log("Fire!!!");
        let npc = this.getNPCCloseToPlayer();
        if (npc != null) {
          console.log("Kill NPC!!!");
          this.removeNPC(npc);
        } else {
          console.log("No hit");
        }
        break;
      // this.playerService.trigger();
      case Key.ENTER:
        console.log("This probably does something");
        break;
      // this.playerService.??();
    }


  }
}
