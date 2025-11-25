import { Body, Controller, Get, Post, Query } from '@nestjs/common';
import { CreateShortDto } from './dto/create-short.dto';
import { Short } from './entities/short.entity';
import { ShortsService } from './shorts.service';

@Controller('shorts')
export class ShortsController {
  constructor(private readonly shortsService: ShortsService) {}

  @Get()
  findAll(@Query('tag') tag?: string, @Query('q') q?: string): Short[] {
    return this.shortsService.findAll(tag, q);
  }

  @Post()
  create(@Body() createShortDto: CreateShortDto): Short {
    return this.shortsService.create(createShortDto);
  }
}
