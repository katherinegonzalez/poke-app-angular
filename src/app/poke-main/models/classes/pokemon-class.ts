import { IPokemon } from '../interfaces/pokemon';

export class Poke implements IPokemon {
  name: string;
  url: string;

  constructor(name: string, url: string) {
    name = this.name;
    url = this.url;
  }

}
