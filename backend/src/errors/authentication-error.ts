import DomainError from './domain-error';

export default class AuthenticationError extends DomainError {
  constructor() {
    super('Authentication failed.');
  }
}
