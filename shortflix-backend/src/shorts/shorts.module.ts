import { Module } from '@nestjs/common';
import { ShortsController } from './shorts.controller';
import { ShortsService } from './shorts.service';

@Module({
  providers: [ShortsService],
  controllers: [ShortsController],
})
export class ShortsModule {}
