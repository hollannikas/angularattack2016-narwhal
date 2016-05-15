import {Location} from "./location.model";
import {Bat} from "../npc/shared/bat.model";
import {NPC} from "../npc/shared/npc.model";
export enum DungeonObjectType {
  COIN
}

export class DungeonObject {
  type:DungeonObjectType;
  location:Location;
}

export class Tile {
  className:string;
  hasPlayer:boolean;
  npc:NPC;
  object:DungeonObject;
}

export class DungeonMap {
  floorLayer:Tile[][] = [];
  objects:DungeonObject[] = [];
  
  setFloorMap(baseTiles:string[][]) {
    baseTiles.forEach((row) => {
      let tileRow = [];
      row.forEach((className) => {
        const tile = new Tile();
        tile.className = className;
        tileRow.push(tile);
      });
      this.floorLayer.push(tileRow);
    });
  }

  removeObject(dungeonObject:DungeonObject) {
    var index = this.objects.indexOf(dungeonObject, 0);
    if (index > -1) {
      this.objects.splice(index, 1);
    }
  }
}
