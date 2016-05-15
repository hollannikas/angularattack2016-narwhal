import {Component, Input} from "@angular/core";
import {Tile, DungeonObjectType} from "./shared/map.model";
import {CharacterType} from "./shared/character.model";

@Component({
  selector: 'sv-tile',
  templateUrl: 'app/tile.component.html'
})
export class TileComponent {
  @Input()
  tile:Tile;

  @Input()
  index:number;

  @Input()
  isLastOfRow:boolean;

  getObjectStyleClass():string {
    switch(this.tile.object.type) {
      case DungeonObjectType.COIN:
        return "coins";
      case DungeonObjectType.CORRIDOR:
        return "f";
    }
  }

  getNpcStyleClass():string {
    switch(this.tile.npc.type) {
      case CharacterType.BAT:
        return 'BB';
      case CharacterType.SPIDER:
        return 'SS';
    }
    return '';
  }

}


