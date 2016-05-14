import { bootstrap }    from '@angular/platform-browser-dynamic';

import { AppComponent } from './app.component';
import {PlayerService} from "./player/shared/player.service";

bootstrap(AppComponent, PlayerService);
