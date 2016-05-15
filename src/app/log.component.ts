import {Component, Input, ElementRef} from "@angular/core";

@Component({
  selector: 'sv-log',
  templateUrl: 'app/log.component.html'
})
export class LogComponent {

  @Input()
  private log:string[];

  private logElement:ElementRef;
  private logBox;

  constructor(logElement:ElementRef) {
    this.logElement = logElement;

  }

  ngOnInit() {

    this.logBox = this.logElement.nativeElement.children[1];
  }

  ngDoCheck() {
    this.logBox.scrollTop = this.logBox.scrollHeight;
  }

}


