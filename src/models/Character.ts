import { Episode } from './Episode';

export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  gender: string;
  origin: Origin;
  location: Origin;
  image: string;
  episode: Partial<Episode>[];
  url: string;
  created: string;
}

interface Origin {
  name: string;
  url: string;
}
