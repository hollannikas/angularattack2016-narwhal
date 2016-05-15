import {Location} from "./location.model";
import {NPC} from "../npc/shared/npc.model";
export enum DungeonObjectType {
  COIN,
  CORRIDOR
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
  hasPlatino:boolean;
}

export class DungeonMap {
  floorLayer:Tile[][] = [];
  objects:DungeonObject[] = [];
  npcs:NPC[] = [];
  playerEntryLocation:Location;

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
    let index = this.objects.indexOf(dungeonObject, 0);
    if (index > -1) {
      this.objects.splice(index, 1);
    }
  }

  removeNPC(npc:NPC) {
    let index = this.npcs.indexOf(npc, 0);
    if (index > -1) {
      this.npcs.splice(index, 1);
    }
  }

  getCorridor():Location {
    let corridor:DungeonObject = this.objects.find(x => x.type == DungeonObjectType.CORRIDOR);
    if (corridor) {
      return corridor.location;
    }
    return null;
  }

}
