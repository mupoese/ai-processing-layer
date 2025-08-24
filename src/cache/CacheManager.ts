import { LRUCache } from 'lru-cache';
import { CacheEntry, Priority } from '../types';

/**
 * Advanced cache manager with priority-based eviction and memory management
 */
export class CacheManager {
  private cache: LRUCache<string, CacheEntry>;
  private stats = {
    hits: 0,
    misses: 0,
    sets: 0,
    evictions: 0
  };

  constructor(maxSize: number = 1000, maxAge: number = 300000) { // 5 minutes default
    this.cache = new LRUCache<string, CacheEntry>({
      max: maxSize,
      ttl: maxAge,
      updateAgeOnGet: true,
      allowStale: false,
      dispose: (value, key) => {
        this.stats.evictions++;
        console.log(`Cache entry evicted: ${key}`);
      }
    });
  }

  /**
   * Store data in cache with priority and TTL
   */
  async set(key: string, value: any, ttl?: number, priority: Priority = Priority.NORMAL): Promise<void> {
    const entry: CacheEntry = {
      key,
      value,
      timestamp: Date.now(),
      ttl: ttl || 300000,
      accessCount: 0,
      priority
    };

    this.cache.set(key, entry, { ttl: entry.ttl });
    this.stats.sets++;
  }

  /**
   * Retrieve data from cache
   */
  async get(key: string): Promise<any> {
    const entry = this.cache.get(key);
    
    if (entry) {
      entry.accessCount++;
      this.stats.hits++;
      return entry.value;
    } else {
      this.stats.misses++;
      return null;
    }
  }

  /**
   * Check if key exists in cache
   */
  async has(key: string): Promise<boolean> {
    return this.cache.has(key);
  }

  /**
   * Delete entry from cache
   */
  async delete(key: string): Promise<boolean> {
    return this.cache.delete(key);
  }

  /**
   * Clear all cache entries
   */
  async clear(): Promise<void> {
    this.cache.clear();
  }

  /**
   * Get cache statistics
   */
  getStats(): any {
    return {
      ...this.stats,
      size: this.cache.size,
      hitRate: this.stats.hits / (this.stats.hits + this.stats.misses) || 0
    };
  }

  /**
   * Get all keys with priority filtering
   */
  getKeysByPriority(priority: Priority): string[] {
    const keys: string[] = [];
    
    for (const [key, entry] of this.cache.entries()) {
      if (entry.priority === priority) {
        keys.push(key);
      }
    }
    
    return keys;
  }

  /**
   * Optimize cache by removing low-priority, rarely accessed items
   */
  optimize(): void {
    const entries = Array.from(this.cache.entries());
    
    // Sort by priority and access count
    const candidates = entries
      .filter(([_, entry]) => 
        entry.priority === Priority.LOW && 
        entry.accessCount < 2 &&
        (Date.now() - entry.timestamp) > entry.ttl / 2
      )
      .map(([key, _]) => key);

    // Remove candidates
    candidates.forEach(key => {
      this.cache.delete(key);
      this.stats.evictions++;
    });
  }

  /**
   * Backup critical cache entries
   */
  backupCritical(): Map<string, any> {
    const backup = new Map<string, any>();
    
    for (const [key, entry] of this.cache.entries()) {
      if (entry.priority === Priority.CRITICAL) {
        backup.set(key, entry.value);
      }
    }
    
    return backup;
  }

  /**
   * Restore critical cache entries from backup
   */
  async restoreCritical(backup: Map<string, any>): Promise<void> {
    for (const [key, value] of backup.entries()) {
      await this.set(key, value, 600000, Priority.CRITICAL); // 10 minutes TTL
    }
  }
}