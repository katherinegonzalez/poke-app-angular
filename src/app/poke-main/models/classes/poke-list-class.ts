import { IPokeList } from '../interfaces/poke-list';
import {Poke} from './pokemon-class';

export class PokeList implements IPokeList {
  count: number;
  next: string;
  previous: string;
  results: Poke[];

  constructor() {}
}
