import { EmailInvalidError } from '@/shared/erros';
import { ValueObject } from '../core/value-object.base';

interface EmailProps {
  value: string;
}

export class Email extends ValueObject<EmailProps> {
  constructor(email: string) {
    super({ value: email.toLowerCase().trim() });
    this.validate();
  }

  get value(): string {
    return this.props.value;
  }

  private validate(): void {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(this.props.value)) {
      throw new EmailInvalidError();
    }
  }

  static create(props: EmailProps): Email {
    return new Email(props.value);
  }

  public toString(): string {
    return this.props.value;
  }
}
