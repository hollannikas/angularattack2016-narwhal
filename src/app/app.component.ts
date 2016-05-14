import {Component} from "@angular/core";
import {ViewportComponent} from "./viewport.component";

@Component({
  selector: 'sv-app',
  templateUrl: './app/app.component.html',
  directives: [ViewportComponent]
})
export class AppComponent {
  /**
   * w = wall
   * f = floor
   * a = abyss
   * p = player
   *
   */
  dungeonMap:string[][] = [
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w'],
    ['w', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'w'],
    ['w', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'w'],
    ['w', 'f', 'f', 'f', 'a', 'f', 'f', 'f', 'f', 'w'],
    ['w', 'f', 'f', 'f', 'a', 'f', 'f', 'f', 'f', 'w'],
    ['w', 'f', 'f', 'f', 'a', 'f', 'f', 'f', 'f', 'w'],
    ['w', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'w'],
    ['w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w', 'w']
  ];
}
