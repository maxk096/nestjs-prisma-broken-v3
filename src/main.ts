import { HttpAdapterHost, NestFactory } from '@nestjs/core';
import { PrismaClientExceptionFilter, PrismaService } from 'nestjs-prisma';
import { Prisma } from '@prisma/client';
import { AppModule } from './app.module';

console.log('Prisma:', {
  PrismaClientVersion: Prisma.prismaVersion.client,
  NotFoundError: (Prisma as any).NotFoundError,
  PrismaClientKnownRequestError: (Prisma as any).PrismaClientKnownRequestError,
});

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // enable shutdown hook
  const prismaService: PrismaService = app.get(PrismaService);
  await prismaService.enableShutdownHooks(app);

  // prisma exception filter
  const { httpAdapter } = app.get(HttpAdapterHost);
  app.useGlobalFilters(new PrismaClientExceptionFilter(httpAdapter));

  await app.listen(3000);
}
bootstrap();
