import { BaseEntity } from './BaseEntity';
import { Character } from './Character';

export interface Episode extends BaseEntity {
  air_date: string;
  episode: string;
  characters: Character[];
}
