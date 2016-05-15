import {Component, Input} from "@angular/core";
import {Player} from "./player/shared/player.model";

@Component({
  selector: 'sv-status',
  templateUrl: 'app/status.component.html',
  styleUrls: ['app/status.component.css']
})
export class StatusComponent {
  @Input()
  player:Player;
}
