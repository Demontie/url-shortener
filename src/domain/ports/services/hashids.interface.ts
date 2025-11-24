export interface IHashidsService {
  encode(id: bigint | number): string;
  decode(hash: string): bigint | number;
}
