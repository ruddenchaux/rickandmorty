export interface Character {
  id: number;
  name: string;
  status: string;
  species: string;
  type: string;
  location: { name: string };
  image: string;
  episode: { name: string }[];
}
