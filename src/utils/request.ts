import params2query from './params_to_query'
import { NetworkError } from '../types/errors'

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

  private readonly handleResponse = <T>(response: Response): Promise<T> => {
    if (response.ok) {
      return response.json()
    }
    throw new NetworkError(response)
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
}
