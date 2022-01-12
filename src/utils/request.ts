import params2query from './params-to-query'
import HttpStatusCodes from './http-status-code'
import {
  AuthorizationError,
  NetworkError,
  ValidationError,
} from '../types/errors'

export interface FetchRequestOptions {
  prefix: string
  headers: Record<string, string>
  params: Record<string, string | number | boolean>
}

export default class FetchRequest {
  private readonly defaultOptions: FetchRequestOptions = {
    prefix: '',
    headers: {},
    params: {},
  }
  private readonly options: FetchRequestOptions

  private readonly handleJSON = (response: Response) => {
    const contentType = response.headers.get('content-type') || ''
    if (contentType.includes('application/json')) {
      return response.json()
    }
    return JSON.parse('{}')
  }

  private readonly handleResponse = <T>(response: Response): Promise<T> => {
    if (response.ok) {
      return this.handleJSON(response)
    }

    switch (response.status) {
      case HttpStatusCodes.UNAUTHORIZED:
        throw new AuthorizationError(response)
      case HttpStatusCodes.FORBIDDEN: //FORBIDDEN
      case HttpStatusCodes.UNPROCESSABLE_ENTITY:
        throw new ValidationError(response)
      default:
        throw new NetworkError(response)
    }
  }

  private readonly generateFinalUrl = (
    url: string,
    options: Partial<FetchRequestOptions> = {}
  ) => {
    const prefix = options.prefix ?? this.options.prefix
    const params = Object.assign({}, this.options.params, options.params ?? {})
    let finalUrl = `${prefix}${url}`
    if (Object.keys(params).length > 0) {
      finalUrl += `?${params2query(params)}`
    }
    return finalUrl
  }

  private readonly generateFinalHeaders = (
    options: Partial<FetchRequestOptions> = {}
  ): FetchRequestOptions['headers'] => {
    return Object.assign({}, this.options.headers, options.headers ?? {})
  }

  constructor(options: Partial<FetchRequestOptions> = {}) {
    this.options = Object.assign({}, this.defaultOptions, options)
  }

  private runFetch(
    method: 'GET' | 'DELETE' | 'POST' | 'PUT' | 'PATCH',
    url: string,
    data?: unknown,
    options?: Partial<FetchRequestOptions>
  ): Promise<Response> {
    const finalUrl = this.generateFinalUrl(url, options)

    const headers = this.generateFinalHeaders(options)
    const fetchOptions: any = { method, headers }
    if (data !== undefined) fetchOptions.body = JSON.stringify(data)

    return fetch(finalUrl, fetchOptions)
  }

  get<T = unknown>(
    url: string,
    options?: Partial<FetchRequestOptions>
  ): Promise<T> {
    return this.runFetch('GET', url, undefined, options).then((r) =>
      this.handleResponse<T>(r)
    )
  }

  post<T = unknown>(
    url: string,
    data?: unknown,
    options?: Partial<FetchRequestOptions>
  ): Promise<T> {
    return this.runFetch('POST', url, data, options).then((r) =>
      this.handleResponse<T>(r)
    )
  }

  put<T = unknown>(
    url: string,
    data?: unknown,
    options?: Partial<FetchRequestOptions>
  ): Promise<T> {
    return this.runFetch('PUT', url, data, options).then((r) =>
      this.handleResponse<T>(r)
    )
  }

  delete<T = unknown>(
    url: string,
    data?: unknown,
    options?: Partial<FetchRequestOptions>
  ): Promise<T> {
    return this.runFetch('DELETE', url, data, options).then((r) =>
      this.handleResponse<T>(r)
    )
  }

  setAuthorizationHeader(token: string) {
    this.options.headers.authorization = `Token ${token}`
  }

  deleteAuthorizationHeader() {
    delete this.options?.headers?.authorization
  }
}
