import { BaseEntity } from './BaseEntity';
import { Character } from './Character';

export interface Location extends BaseEntity {
  type: string;
  dimension: string;
  residents: Character[];
}
