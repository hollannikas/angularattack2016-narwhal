import {Component, Input, HostListener} from "@angular/core";
import {TileComponent} from "./tile.component";
import {Key, Direction} from "./constants";
import {PlayerService} from "./player/shared/player.service";
import {Location} from "./shared/location.model";
import {NPCService} from "./npc/shared/npc.service";
import {Bat} from "./npc/shared/bat.model";
import {Player} from "./player/shared/player.model";
import {DungeonMap} from "./shared/map.model";

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

  private bat:Bat;

  constructor(private playerService:PlayerService, private npcService:NPCService) {

  }

  ngOnInit() {
    console.log("ngOnInit ViewportComponent")

    this.playerService.player$.subscribe(p => {
      this.player = p;
    });

    this.npcService.npc$.subscribe(l => {
      this.bat = l;
    });

    this.restartGame();
  }

  getMap():string[][] {
    let viewport = [];
    // deep copy
    this.map.floorLayer.forEach((row) => {
      let targetRow = [];
      row.forEach((tile) => {
        targetRow.push(tile);
      });
      viewport.push(targetRow);
    });

    this.drawPlayer(viewport);
    this.drawBat(viewport);
    this.drawObjects(viewport, this.map);
    return viewport;
  }


  drawObjects(viewport:string[][], map:DungeonMap) {
    console.log("Map " + map);
    map.objects.forEach((object) => {
      // TODO map string from ObjectType enum
      viewport[object.location.x][object.location.y] = "coin";
    });
  }

  restartGame() {
    this.playerService.setStartLocation({x: 1, y: 1});
    this.bat = new Bat();
    this.bat.location = {x: 5, y: 5};
    this.bat.direction = Direction.DOWN;
    this.bat.name = "man";
    this.npcService.addBat(this.bat);
  }

  drawPlayer(viewport:string[][]) {
    viewport[this.player.location.y][this.player.location.x] = 'p';
  }

  drawBat(viewport:string[][]) {
    viewport[this.bat.location.y][this.bat.location.x] = 'b';
  }

  checkPlayerWallCollision(location:Location):boolean {
    const nextTile = this.map.floorLayer[location.y][location.x];
    let collision = nextTile.startsWith('w');
    if (collision) {
      console.log("Damn wall!")
    }
    return collision;
  }

  checkNPCWallCollision(location:Location):boolean {
    const nextTile = this.map.floorLayer[location.y][location.x];
    let collision = nextTile.startsWith('w');
    if (collision) {
      console.log("Uuuhh not that way");
    }
    return collision;
  }

  checkPlayerNPCCollision() {
    if (this.bat.location.x == this.player.location.x
      && this.bat.location.y == this.player.location.y) {
      return true;
    }
    return false;
  }

  isPlayerMove(event:KeyboardEvent) {
    switch (event.keyCode) {
      case Key.ARROW_DOWN:
      case Key.ARROW_UP:
      case Key.ARROW_LEFT:
      case Key.ARROW_RIGHT:
        return true;
    }
    return false;
  }

  canPlayerSelectNPC() {
    //if(this.bat.location.x == this.player.location.x && this.bat.location){

    //}
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
        break;
      // this.playerService.trigger();
      case Key.ENTER:
        console.log("This probably does something");
        break;
      // this.playerService.??();
    }
    if (this.canPlayerSelectNPC()) {

    } else if (this.isPlayerMove(event)) {
      if (this.checkNPCWallCollision(this.npcService.nextLocation(this.bat.direction))) {
        this.npcService.changeDirection();
      }
      this.npcService.move();
      if (this.checkPlayerNPCCollision()) {
        alert("Arrrrgh! I am DEAD.");
        this.restartGame();
      }
    }

  }
}
