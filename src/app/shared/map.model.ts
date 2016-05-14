import {Location} from "./location.model";
import {Bat} from "../npc/shared/bat.model";
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
  // TODO should be NPC interface
  npc:Bat;
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
}
