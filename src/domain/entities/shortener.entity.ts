import { Entity } from '../core/entity.base';

export type ShortenerProps = {
  shortCode: string;
  longUrl: string;
  createdAt?: Date;
};

export class Shortener extends Entity {
  shortCode: string;
  longUrl: string;

  constructor(props: ShortenerProps) {
    super(props);
    this.validate(props);
    this.shortCode = props.shortCode;
    this.longUrl = props.longUrl;
  }

  private validate(props: ShortenerProps): void {
    if (!props.shortCode) {
      throw new Error('ShortCode is required');
    }

    if (!props.longUrl) {
      throw new Error('Long URL is required');
    }
  }

  static create(props: ShortenerProps): Shortener {
    const shortener = new Shortener(props);
    return shortener;
  }

  toJSON(): ShortenerProps {
    return {
      shortCode: this.shortCode,
      longUrl: this.longUrl,
      createdAt: this.createdAt,
    };
  }
}
