class CustomError extends Error {
  response: Response

  constructor(name: string, response: Response) {
    super(name)
    this.response = response
  }
}

export class NetworkError extends CustomError {
  constructor(respnse: Response) {
    super('NETWORK_ERROR', respnse)
  }
}
export class AuthorizationError extends CustomError {
  constructor(response: Response) {
    super('AUTHORIZATION_ERROR', response)
  }
}

export class ValidationError<
  T extends Partial<Record<string, string[]>>
> extends CustomError {
  constructor(response: Response) {
    super('VALIDATION_ERROR', response)
  }

  async getErrors(): Promise<T> {
    return this.response.json().then((json) => json.errors as T)
  }
}
