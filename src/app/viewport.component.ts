import {Component, Input, HostListener} from "@angular/core";
import {TileComponent} from "./tile.component";
import {Key, Direction} from "./constants";
import {PlayerService} from "./player/shared/player.service";
import {Location} from "./shared/location.model";
import {NPCService} from "./npc/shared/npc.service";
import {Bat} from "./npc/shared/bat.model";
import {Player} from "./player/shared/player.model";

@Component({
  selector: 'sv-viewport',
  templateUrl: 'app/viewport.component.html',
  styleUrls: ['app/viewport.component.css'],
  directives: [TileComponent]
})
export class ViewportComponent {

  // TODO we start out with a single room map, should be multiple rooms
  @Input()
  map:string[][];

  private player:Player;

  private bat:Bat;

  constructor(private playerService:PlayerService, private npcService:NPCService) {

  }

  ngOnInit() {
    console.log("ngOnInit ViewportComponent")

    this.playerService.player$.subscribe(p => {
      this.player = p;
    });
    this.playerService.setStartLocation({x: 1, y: 1});

    this.npcService.npc$.subscribe(l => {
      this.bat = l;
    });
    this.bat = new Bat();
    this.bat.location = {x: 5, y: 5};
    this.bat.direction = Direction.DOWN;
    this.bat.name = "man";
    this.npcService.addBat(this.bat);
  }

  getMap():string[][] {
    let viewport = [];
    // deep copy
    this.map.forEach((row) => {
      let targetRow = [];
      row.forEach((tile) => {
        targetRow.push(tile);
      });
      viewport.push(targetRow);
    });

    this.drawPlayer(viewport);
    this.drawBat(viewport);
    // TODO add layers here (NPC, objects, etc.)
    return viewport;
  }

  drawPlayer(viewport:string[][]) {
    viewport[this.player.location.y][this.player.location.x] = 'p';
  }

  drawBat(viewport:string[][]) {
    viewport[this.bat.location.y][this.bat.location.x] = 'b';
  }

  checkPlayerWallCollision(location:Location):boolean {
    const nextTile = this.map[location.y][location.x];
    let collision = (nextTile == 'w');
    console.log(location);
    if (collision) {
      alert("Damn wall")
    }
    return collision;
  }

  checkNPCWallCollision(location:Location):boolean {
    const nextTile = this.map[location.y][location.x];
    let collision = (nextTile == 'w');
    console.log(location);
    if (collision) {
      console.log(location);
    }
    return collision;
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
    // TODO only move if player moved?
    if (this.checkNPCWallCollision(this.npcService.nextLocation(this.bat.direction))) {
      console.log("NPC collision");
      this.npcService.changeDirection();
      this.npcService.move();
    } else {
      this.npcService.move();
    }
    //this.npcService.move(this.npcService.nextFollowLocation(this.playerLocation));
  }
}
