import {bootstrap} from "@angular/platform-browser-dynamic";
import { enableProdMode } from '@angular/core';
import {AppComponent} from "./app/app.component";
import {PlayerService} from "./app/player/shared/player.service";
import {NPCService} from "./app/npc/shared/npc.service";
import {environment} from "./environment";

//if (environment.production) {
//  enableProdMode();
//}

bootstrap(AppComponent, [PlayerService, NPCService]);


