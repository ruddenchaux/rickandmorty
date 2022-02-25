import { createHash } from 'crypto';
import { createStore, set, get, UseStore } from 'idb-keyval';
import { Strategy, StrategyOptions } from 'workbox-strategies';

// eslint-disable-next-line import/prefer-default-export
export class StaleWhileRevalidateIndexDb extends Strategy {
  store!: UseStore;

  constructor(options?: StrategyOptions) {
    super(options);
    this.createStore();
  }

  private createStore() {
    // Init indexedDB using idb-keyval, https://github.com/jakearchibald/idb-keyval
    this.store = createStore('graphql-cache', 'post-response');
  }

  // eslint-disable-next-line no-underscore-dangle
  async _handle(request: Request): Promise<Response | undefined> {
    const cachedResponse = await this.getCache(request.clone());
    const fetchPromise = fetch(request.clone())
      .then((response) => {
        this.setCache(request.clone(), response.clone());
        return response;
      })
      .catch((err) => {
        // eslint-disable-next-line
        console.error(err);
      });
    return cachedResponse ? Promise.resolve(cachedResponse) : (fetchPromise as Promise<Response>);
  }

  private async getCache(request: Request) {
    let data;
    try {
      const body = await request.json();
      const id = StaleWhileRevalidateIndexDb.md5(body.query).toString();
      data = await get(id, this.store);
      if (!data) return null;

      // Check cache max age.
      const cacheControl = request.headers.get('Cache-Control');
      const maxAge = cacheControl ? parseInt(cacheControl.split('=')[1], 10) : 3600;
      if (Date.now() - data.timestamp > maxAge * 1000) {
        // Cache expired. Load from API endpoint
        return null;
      }

      // Load response from cache
      return new Response(JSON.stringify(data.response.body), data.response);
    } catch (err) {
      return null;
    }
  }

  private async setCache(request: Request, response: Response) {
    const body = await request.json();
    const id = StaleWhileRevalidateIndexDb.md5(body.query).toString();

    const entry = {
      query: body.query,
      response: await StaleWhileRevalidateIndexDb.serializeResponse(response),
      timestamp: Date.now()
    };

    set(id, entry, this.store);
  }

  private static async serializeResponse(response: Response) {
    const serializedHeaders: { [x: string]: string } = {};

    response.headers.forEach((value, key) => {
      serializedHeaders[key] = value;
    });

    return {
      headers: serializedHeaders,
      status: response.status,
      statusText: response.statusText,
      body: await response.json()
    };
  }

  private static md5(data: string): string {
    return createHash('md5').update(data).digest('hex');
  }
}
