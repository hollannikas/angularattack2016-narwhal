import {Location} from "./location.model";
export enum DungeonObjectType {
  COIN
}

export class DungeonObject {
  type:DungeonObjectType;
  location:Location;
}

export class DungeonMap {
  floorLayer:string[][];
  objects:DungeonObject[] = [];
}
