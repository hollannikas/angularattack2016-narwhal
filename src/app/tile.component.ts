import {Component, Input} from "@angular/core";
import {Tile} from "./shared/map.model";

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

  constructor() {
  }

  ngOnInit() {

  }
}


