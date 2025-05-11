// prisma.module.ts
import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService],
  exports: [PrismaService], // Exportamos PrismaService para que otros módulos puedan usarlo
})
export class PrismaModule {}
