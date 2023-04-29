import { Injectable } from '@nestjs/common';
import { PrismaService } from 'nestjs-prisma';

@Injectable()
export class AppService {
  constructor(private prisma: PrismaService) {}

  rejectOnNotFound() {
    return this.prisma.user.findFirst({
      where: {
        email: 'non-existing@email.io',
      },
      rejectOnNotFound: true,
    });
  }
}
