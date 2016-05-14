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
    ['w_cul', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_cur'],
    ['w_a', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'w_a'],
    ['w_a', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'w_a'],
    ['w_a', 'f', 'f', 'f', 'a', 'f', 'f', 'f', 'f', 'w_a'],
    ['w_a', 'f', 'f', 'f', 'a', 'f', 'f', 'f', 'f', 'w_a'],
    ['w_a', 'f', 'f', 'f', 'a', 'f', 'f', 'f', 'f', 'w_a'],
    ['w_a', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'f', 'w_a'],
    ['w_cdl', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_b', 'w_cdr']
  ];
}
