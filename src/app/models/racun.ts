import { TipRacuna } from './tip-racuna';
import { Klijent } from './klijent';

export class Racun {
  id: number;
  naziv: string;
  opis: string;
  oznaka: string;
  tipRacuna: TipRacuna;
  klijent: Klijent;
}
