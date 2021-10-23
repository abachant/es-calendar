import DomainError from './domain-error';

export default class AuthorizationError extends DomainError {
  constructor() {
    super('Authorization failed.');
  }
}
