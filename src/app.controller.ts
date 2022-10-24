import { Body, Controller, Get, HttpCode, Param, Post } from '@nestjs/common';
import { RedisStore } from './redis-store/redis-store';

interface StoredDataDTO {
  key: string;
  value: string;
}

@Controller()
export class AppController {
  constructor(private readonly redisStore: RedisStore) {}

  @Get('/:key')
  async findStoredData(@Param('key') key: string) {
    return this.redisStore.findByKey(key);
  }

  @Post()
  @HttpCode(201)
  async createStoredData(@Body() body: StoredDataDTO) {
    const { key, value } = body;
    return await this.redisStore.create(key, value);
  }
}
