import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import Redis, { RedisKey } from 'ioredis';

@Injectable()
export class RedisStore {
  private store: Redis;

  constructor(private readonly config: ConfigService) {
    this.store = new Redis({
      host: config.get<string>('REDIS_HOST'),
      port: config.get<number>('REDIS_PORT'),
      db: config.get<number>('REDIS_DB'),
    });
  }

  async create(key: RedisKey, value: string) {
    return this.store.set(key, value);
  }

  async createWithExpiration(key: RedisKey, value: string, expiration: number) {
    return this.store.setex(key, expiration, value);
  }

  async findByKey(key: RedisKey) {
    return this.store.get(key);
  }

  async deleteByKey(key: RedisKey) {
    return this.store.del(key);
  }

  async clear() {
    return this.store.flushall();
  }
}
