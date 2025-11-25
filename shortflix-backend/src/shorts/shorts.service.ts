import { Injectable } from '@nestjs/common';
import { CreateShortDto } from './dto/create-short.dto';
import { Short } from './entities/short.entity';

@Injectable()
export class ShortsService {
  private shorts: Short[] = [
    {
      id: 1,
      videoUrl: 'https://www.w3schools.com/html/mov_bbb.mp4',
      title: 'Big Buck Bunny Intro',
      tags: ['animation', 'fun', 'sample'],
    },
    {
      id: 2,
      videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      title: 'Sample Clip 5 Seconds',
      tags: ['sample', 'short'],
    },
    {
      id: 3,
      videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-10s.mp4',
      title: 'Sample Clip 10 Seconds',
      tags: ['sample', 'medium'],
    },
    {
      id: 4,
      videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-15s.mp4',
      title: 'Sample Clip 15 Seconds',
      tags: ['sample', 'long'],
    },
    {
      id: 5,
      videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-5s.mp4',
      title: 'City Vibes Short',
      tags: ['city', 'vibes', 'short'],
    },
    {
      id: 6,
      videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-20s.mp4',
      title: 'Fast Street Run',
      tags: ['action', 'street', 'fast'],
    },
    {
      id: 7,
      videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-30s.mp4',
      title: 'Calm Nature View',
      tags: ['nature', 'calm', 'relax'],
    },
    {
      id: 8,
      videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-30s.mp4',
      title: 'Tech Neon Short',
      tags: ['tech', 'neon', 'vfx'],
    },
    {
      id: 9,
      videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-30s.mp4',
      title: 'Travel Moments',
      tags: ['travel', 'vlog', 'lifestyle'],
    },
    {
      id: 10,
      videoUrl: 'https://samplelib.com/lib/preview/mp4/sample-30s.mp4',
      title: 'Ocean Waves Short',
      tags: ['ocean', 'relax', 'nature'],
    },
  ];

  findAll(tag?: string, q?: string): Short[] {
    let result = this.shorts;

    if (tag) {
      const lowerTag = tag.toLowerCase();
      result = result.filter((short) =>
        short.tags.some((t) => t.toLowerCase() === lowerTag),
      );
    }

    if (q) {
      const query = q.toLowerCase();
      result = result.filter(
        (short) =>
          short.title.toLowerCase().includes(query) ||
          short.tags.some((t) => t.toLowerCase().includes(query)),
      );
    }

    return result;
  }

  create(createShortDto: CreateShortDto): Short {
    const nextId =
      this.shorts.length > 0
        ? Math.max(...this.shorts.map((s) => s.id)) + 1
        : 1;

    const newShort: Short = {
      id: nextId,
      ...createShortDto,
    };

    this.shorts.push(newShort);
    return newShort;
  }
}
