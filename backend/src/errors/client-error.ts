import DomainError from './domain-error';

export default class ClientError extends DomainError {
  public code?: number;

  constructor(message: string, code?: number) {
    super(message);

    this.code = code;
  }
}
