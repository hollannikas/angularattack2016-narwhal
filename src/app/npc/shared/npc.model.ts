import {Character} from "../../shared/character.model";
import {Direction} from "../../constants";

export abstract class NPC extends Character {
  name:string;
  direction:Direction;
  abstract changeDirection();
  
}
