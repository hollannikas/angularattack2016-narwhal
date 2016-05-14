import {Component, Input} from '@angular/core';

@Component({
  selector: 'sv-tile',
  templateUrl: 'app/tile.component.html'
})
export class TileComponent {
  @Input()
  id:string;
}
