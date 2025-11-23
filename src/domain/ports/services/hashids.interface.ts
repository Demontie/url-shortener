export interface IHashidsService {
  encode(id: number): string;
  decode(hash: string): number;
}
