import {Component, Input, HostListener, Output, EventEmitter, SimpleChange} from "@angular/core";
import {TileComponent} from "./tile.component";
import {Key, Direction} from "./constants";
import {PlayerService} from "./player/shared/player.service";
import {Location} from "./shared/location.model";
import {NPCService} from "./npc/shared/npc.service";
import {Player} from "./player/shared/player.model";
import {DungeonMap, Tile, DungeonObjectType, DungeonObject} from "./shared/map.model";
import {NPC} from "./npc/shared/npc.model";
import {StatusComponent} from "./status.component";
import {LogComponent} from "./log.component";

@Component({
  selector: 'sv-viewport',
  templateUrl: 'app/viewport.component.html',
  styleUrls: ['app/viewport.component.css'],
  directives: [TileComponent, StatusComponent, LogComponent]
})
export class ViewportComponent {

  
  @Input()
  map:DungeonMap;

  @Input()
  availableCoins:number;

  @Output()
  mapChanged:EventEmitter<any> = new EventEmitter();

  @Output()
  objectiveReachedEvent:EventEmitter<any> = new EventEmitter();

  @Output()
  gameOverEvent:EventEmitter<any> = new EventEmitter();


  private messages:string[] = [];

  private player:Player;

  private npcs:NPC[];

  private objectiveReached:boolean = false;

  private jumpCounter = 0;
  private showPlatino = false;

  private initialised:boolean = false;

  constructor(private playerService:PlayerService, private npcService:NPCService) {

  }

  ngOnChanges(changes:{[propName:string]:SimpleChange}) {
    if (changes['map'] && changes['map'].currentValue && this.initialised) {
      this.resetNPCs();
      console.log("Relocating");
      // TODO relocate player
      this.playerService.setLocation(this.map.playerEntryLocation);
      this.player.location = this.map.playerEntryLocation;
    }
  }

  ngOnInit() {
    console.log("ngOnInit ViewportComponent")

    this.playerService.player$.subscribe(p => {
      this.player = p;
      this.handleNPCsMove();
      this.handleObjectCollsions();
    });

    this.npcService.npc$.subscribe(l => {
      this.npcs = l;
    });

    this.initGame();

    this.initialised = true;
  }

  initGame() {
    if(this.player) {
      this.player.coins = 0;
    }
    this.playerService.setStartLocation({x: 1, y: 1});
    // TODO add reset on service?
    this.resetNPCs();


  }

  resetNPCs() {
    this.npcService.reset();

    this.map.npcs.forEach(x => {
      console.log(x);
      this.npcService.addNpc(x);
    });

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
    map.objects.forEach((object) => {
      // TODO map string from ObjectType enum
      viewport[object.location.y][object.location.x].object = object;
    });
  }

  drawPlayer(viewport:Tile[][]) {
    viewport[this.player.location.y][this.player.location.x].hasPlayer = true;
    if (this.showPlatino) {
      try {
        viewport[this.player.location.y - 1][this.player.location.x].hasPlatino = true;
      } catch (e) {
        // Nothing
      }

    }
  }

  drawNPCs(viewport:Tile[][], map:DungeonMap) {
    map.npcs.forEach((object) => {
      // TODO map string from ObjectType enum
      viewport[object.location.y][object.location.x].npc = object;
    });
  }

  checkPlayerWallCollision(location:Location):boolean {
    let collision = false;
    try {
      const nextTile = this.map.floorLayer[location.y][location.x];
      if (nextTile.className.startsWith('w')) {
        this.log("You hit the wall!");
      }
      if (nextTile.className == 'a' || nextTile.className == 'al' || nextTile.className == 'ar') {
        this.log("When you look into an abyss, the abyss also looks into you.");
      }

      collision = nextTile.className.startsWith('w')
        || nextTile.className == 'a' || nextTile.className == 'ar' || nextTile.className == 'al';
    } catch (e) {
      collision = true;
    }
    return collision;
  }

  checkPlayerNPCCollision(location:Location = this.player.location) {
    let collision:boolean = false;
    this.npcs.forEach((npc) => {
      if (npc.location.x === location.x
        && npc.location.y === location.y) {
        collision = true;
        //this.log(npc.name + " bit you!");
        return;
      }
    });
    return collision;
  }

  checkNPCPlayerCollision(npcLocation:Location) {
    if (npcLocation.x === this.player.location.x
      && npcLocation.y === this.player.location.y) {
      return true;
    }
    return false;
  }

  isPlayerCloseToNPC(location:Location) {
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
    this.map.objects.forEach((dungeonObject:DungeonObject) => {
      if (dungeonObject.location.x == this.player.location.x && dungeonObject.location.y == this.player.location.y) {
        switch (dungeonObject.type) {
          case DungeonObjectType.COIN:
            this.log("Ca-ching!");
            this.player.coins++;
            this.map.removeObject(dungeonObject);
            // TODO play coin sound!
            break;
          case DungeonObjectType.CORRIDOR:
            this.log("To infinity, and beyond!");
            this.mapChanged.emit(null);
            break;

          default:
            console.log("Unhandled object " + dungeonObject.type);
        }
      }
    });

    // Check if map objective has been reached
    this.objectiveReached = this.player.coins == this.availableCoins;
    if (this.objectiveReached) {
      this.objectiveReachedEvent.emit(null);
    }
  }

  handleNPCsMove() {
    if (this.npcs) {
      this.npcs.forEach((npc) => {
        const nextTileLocation = this.npcService.nextLocation(npc);
        if (!this.checkOutsideOfMap(nextTileLocation)) {
          const nextTile = this.map.floorLayer[nextTileLocation.y][nextTileLocation.x];
          if (!nextTile || npc.checkCollision(nextTile)) {
            //this.log(npc.name + ": Uuuhh not that way");
            this.npcService.changeDirection(npc);
          }
        } else {

          // this.log(npc.name + ": It's the end of the world, as we know it (And I feel fine)");
          this.npcService.changeDirection(npc);
        }
        if (this.checkNPCPlayerCollision(this.npcService.nextLocation(npc))) {
          if (this.player.hp != 0) {
            this.player.hp--;
          }
          this.log(npc.name + " bit you!")
          this.log("Ouch");
          if (this.player.hp == 0) {
            // TODO death dialog here
            this.gameOverEvent.emit(null);
            this.log("Ermagherd I r ded. Wai I still walking?");
          }
        } else {
          this.npcService.move(npc);
        }
      });

    }
  }

  checkOutsideOfMap(location:Location):boolean {
    return location.x == 0 || location.x == 10 || location.y == 0 || location.y == 8;
  }

  log(message:string) {
    this.messages.push(message);
  }

  removeNPC(npc:NPC) {
    this.map.removeNPC(npc);
    this.npcService.removeNPC(npc);
  }

  handlePlayerMove(direction:Direction) {
    if (!this.checkPlayerWallCollision(this.playerService.nextLocation(direction))) {
      if (!this.checkPlayerNPCCollision(this.playerService.nextLocation(direction))) {
        this.playerService.move(direction);
      } else {
        let npc:NPC = this.getNPCCloseToPlayer();
        npc.hp--;
        if (npc.isDead()) {
          this.log("you killed " + npc.name + "!");
          this.removeNPC(npc);
          this.playerService.move(direction);
        } else {
          this.handleNPCsMove();
        }
      }
    }

  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event:KeyboardEvent) {
    event.preventDefault();
    switch (event.keyCode) {
      case Key.ARROW_DOWN:
        this.handlePlayerMove(Direction.DOWN);
        break;
      case Key.ARROW_UP:
        this.handlePlayerMove(Direction.UP);
        break;
      case Key.ARROW_LEFT:
        this.handlePlayerMove(Direction.LEFT);
        break;
      case Key.ARROW_RIGHT:
        this.handlePlayerMove(Direction.RIGHT);
        break;
      case Key.SPACE:
        this.log("I would jump if someone would have added the animation...");
        this.jumpCounter++;
        if (this.jumpCounter == 100) {
          this.log("Ermagehrd! Platino!");
          this.showPlatino = !this.showPlatino;
          this.jumpCounter = 0;
        }
        break;
      // this.playerService.trigger();
      case Key.ENTER:
        this.log("Pushing enter probably does something");
        break;
      // this.playerService.??();
    }


  }
}
