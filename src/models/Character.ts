import { BaseEntity } from './BaseEntity';

export interface Character extends BaseEntity {
  status: string;
  species: string;
  type: string;
  location: { name: string };
  image: string;
  episode: { name: string }[];
}
