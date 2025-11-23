export abstract class Entity {
  public readonly createdAt: Date;

  constructor(props: { id?: string; createdAt?: Date; updatedAt?: Date }) {
    this.createdAt = props.createdAt || new Date();
  }

  abstract toJSON(): Record<string, any>;
}
