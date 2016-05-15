import {Component, Input} from "@angular/core";

@Component({
  selector: 'sv-log',
  templateUrl: 'app/log.component.html'
})
export class LogComponent {

  @Input()
  private log:string[];

}


