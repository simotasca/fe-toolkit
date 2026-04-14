type BodyParsed = null | undefined | BodyInit;
type ReqBodyParser = (body: any) => BodyParsed | Promise<BodyParsed>;

const defaultReqBodyParser = ((body: any) => 
  body ? JSON.stringify(body) : null) satisfies ReqBodyParser;

export type ServiceOptions = {
  reqBodyParser?: ReqBodyParser,
  init?: RequestInit,
  customFetch?: typeof fetch
}

export type SeriviceResult = 
  | { res: Response, error?: undefined }
  | { res?: undefined, error: TypeError }

export class Service {
  private _baseUrl: string;
  private init?: RequestInit;
  private reqBodyParser: ReqBodyParser;
  private fetchFn: typeof fetch;

  constructor(baseUrl: string, options?: ServiceOptions) {
    this._baseUrl = baseUrl;
    this.init = this.mergeInit(
      // the defaultReqBodyParser sends json
      { headers: { "Content-Type": "application/json" } },
      options?.init
    );
    this.reqBodyParser = options?.reqBodyParser || defaultReqBodyParser
    this.fetchFn = options?.customFetch || fetch.bind(window);
  }

  public get baseUrl(): string {
    return this.baseUrl;
  }
  
  public set baseUrl(baseUrl: string) {
    this._baseUrl = baseUrl;
  }

  async fetch(path: string, body?: any, init?: RequestInit) {
    const fullInit = { 
      ...this.mergeInit(init, this.init), 
      body: body && await this.reqBodyParser(body)
    };
    return this.fetchFn(this._baseUrl + path, fullInit)
  }

  async get(path: string, init?: RequestInit) {
    return this.fetch(path, null, { ...init, method: "GET" })
  }

  async post(path: string, body?: any, init?: RequestInit) {
    return this.fetch(path, body, { ...init, method: "POST" })
  }

  async put(path: string, body?: any, init?: RequestInit) {
    return this.fetch(path, body, { ...init, method: "PUT" })
  }

  async patch(path: string, body?: any, init?: RequestInit) {
    return this.fetch(path, body, { ...init, method: "PATCH" })
  }

  async delete(path: string, body?: any, init?: RequestInit) {
    return this.fetch(path, body, { ...init, method: "DELETE" })
  }

  mergeInit(init?: RequestInit, defaults?: RequestInit): RequestInit {
    return { 
      ...defaults,
      ...init,
      headers: { ...defaults?.headers, ...init?.headers }
    }
  }
}