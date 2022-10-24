import { Module } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisStore } from './redis-store';
@Module({
  providers: [ConfigService, RedisStore],
})
export class RedisStoreModule {}
