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
