import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ConfigModule } from '@nestjs/config';
import { RedisStoreModule } from './redis-store/redis-store.module';
import { RedisStore } from './redis-store/redis-store';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: '.development.env',
    }),
    RedisStoreModule,
  ],
  controllers: [AppController],
  providers: [AppService, RedisStore],
})
export class AppModule {}
