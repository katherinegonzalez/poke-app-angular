import { IPokemon } from './pokemon';

export interface IPokeList {
  count: number;
  next: string;
  previous: string;
  results: IPokemon[];
}
