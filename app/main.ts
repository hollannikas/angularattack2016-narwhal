import {bootstrap} from "@angular/platform-browser-dynamic";
import {AppComponent} from "./app.component";
import {PlayerService} from "./player/shared/player.service";
import {NPCService} from "./npc/shared/npc.service";

bootstrap(AppComponent, [PlayerService, NPCService]);
