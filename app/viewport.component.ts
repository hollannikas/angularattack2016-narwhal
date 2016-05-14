import {Component, Input, HostListener} from '@angular/core';
import {TileComponent} from "./tile.component";
import {Key, Direction} from "./constants";

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

  constructor(/* private playerService:PlayerService */) {
    // TODO Start observing player coordinates
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
    // TODO add layers here (NPC, player, objects, etc.)
    return viewport;
  }

  @HostListener('window:keydown', ['$event'])
  onKeyDown(event:KeyboardEvent) {
    event.preventDefault();
    switch(event.keyCode) {
      case Key.ARROW_DOWN:
        console.log(Direction.DOWN);
        //this.playerService.move(Direction.DOWN);
        break;
      case Key.ARROW_UP:
        console.log(Direction.UP);
        //this.playerService.move(Direction.UP);
        break;
      case Key.ARROW_LEFT:
        console.log(Direction.LEFT);
        //this.playerService.move(Direction.LEFT);
        break;
      case Key.ARROW_RIGHT:
        console.log(Direction.RIGHT);
        //this.playerService.move(Direction.RIGHT);
        break;
      case Key.SPACE:
        console.log("Fire!!!");
         // this.playerService.trigger();
      case Key.ENTER:
        console.log("This probably does something");
         // this.playerService.??();
    }
  }
}
