import type { Country } from './types';
import { TH } from './countries/TH';
import { MX } from './countries/MX';
import { JP } from './countries/JP';
import { IT } from './countries/IT';
import { ET } from './countries/ET';
import { PE } from './countries/PE';
import { GE } from './countries/GE';
import { AZ } from './countries/AZ';
import { IN } from './countries/IN';
import { PK } from './countries/PK';
import { AF } from './countries/AF';
import { CN } from './countries/CN';
import { VN } from './countries/VN';
import { KR } from './countries/KR';
import { ID } from './countries/ID';
import { PH } from './countries/PH';
import { MY } from './countries/MY';
import { FR } from './countries/FR';
import { ES } from './countries/ES';
import { GR } from './countries/GR';
import { TR } from './countries/TR';
import { LB } from './countries/LB';
import { EG } from './countries/EG';
import { MA } from './countries/MA';
import { NG } from './countries/NG';
import { BR } from './countries/BR';
import { AR } from './countries/AR';
import { JM } from './countries/JM';
import { US } from './countries/US';
import { PT } from './countries/PT';

export const countries: Country[] = [
  TH, MX, JP, IT, ET, PE, GE, AZ, IN, PK, AF,
  CN, VN, KR, ID, PH, MY, FR, ES, GR, TR, LB, EG, MA, NG, BR, AR, JM, US, PT,
];

export function getCountryById(id: string): Country | undefined {
  return countries.find(c => c.id === id);
}

export function getCountriesByContinent(continent: Country['continent']): Country[] {
  return countries.filter(c => c.continent === continent);
}
