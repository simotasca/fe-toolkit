type CacheItem<T> = {
  value: T;
  expiry: number;
};

type FetchKey = string;
type CacheScope = Record<FetchKey, CacheItem<unknown>>;

type ScopeId = string;
type CacheStore = Record<ScopeId, CacheScope>;

export class Cache {
  private static instance: Cache;
  private store: CacheStore = {};
  private cleanupInterval: number | null = null;
  private readonly CLEANUP_PERIOD = 1000 * 60 * 30; // 30min

  private constructor() {
    this.startCleanupTimer();
  }

  public static getInstance(): Cache {
    if (!Cache.instance) {
      Cache.instance = new Cache();
    }
    return Cache.instance;
  }

  public startCleanupTimer() {
    if (this.cleanupInterval) return;

    this.cleanupInterval = setInterval(() => {
      this.performCleanup();
    }, this.CLEANUP_PERIOD);
  }

  public stopCleanupTimer() {
    if (this.cleanupInterval) {
      clearInterval(this.cleanupInterval);
      this.cleanupInterval = null;
    }
  }

  private performCleanup() {
    const now = Date.now();
    
    for (const scopeId in this.store) {
      const scope = this.store[scopeId];
      let isEmpty = true;
      
      for (const fetchKey in scope) {
        const item = scope[fetchKey];
        
        if (item.expiry <= now) {
          delete scope[fetchKey];
        } else {
          isEmpty = false;
        }
      }
      
      if (isEmpty) {
        delete this.store[scopeId];
      }
    }
  }

  private generateKey(params: any): string {
    try {
      return JSON.stringify(params || {});
    } catch (e) {
      console.error("Errore nella serializzazione dei parametri per la cache:", e);
      return "fallback-key";
    }
  }

  public get(scopeId: string, fetchKey: any): CacheItem<unknown> | null {
    const scope = this.store[scopeId];
    const stringKey = this.generateKey(fetchKey);

    if (scope) {
      const item = scope[stringKey];
      if (item) {
        if (item.expiry > Date.now()) {
          return item;
        } else {
          delete scope[stringKey];
        }
      }
    }

    return null;
  }

  public set<T>(scopeId: string, fetchKey: any, value: T, ttl: number = 1000 * 60 * 5) {
    const stringKey = this.generateKey(fetchKey);
    const expiry = Date.now() + ttl;

    if (!this.store[scopeId]) {
      this.store[scopeId] = {};
    }

    this.store[scopeId][stringKey] = { value, expiry };
  }

  public invalidateScope(scopeId: string) {
    delete this.store[scopeId];
  }

  public clearAll() {
    this.store = {};
  }
}

export const cache = Cache.getInstance();
