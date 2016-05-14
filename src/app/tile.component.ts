import {Component, Input} from "@angular/core";

@Component({
  selector: 'sv-tile',
  templateUrl: 'app/tile.component.html'
})
export class TileComponent implements OnInit {
  @Input()
  id:string;

  @Input()
  index:number;

  @Input()
  isLastOfRow:boolean;

  constructor() {
  }

  ngOnInit() {
    console.log(this.id + " " + this.index + " " + this.isLastOfRow);

  }
}


