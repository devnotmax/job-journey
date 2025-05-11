// auth.module.ts
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { JwtStrategy } from './jwt.strategy';
import { UserService } from '../user/user.service';
import { PrismaModule } from '../prisma/prisma.module'; // Importamos el PrismaModule

@Module({
  imports: [
    JwtModule.register({
      secret: process.env.JWT_SECRET || 'supersecret',
      signOptions: { expiresIn: '1d' },
    }),
    PrismaModule, // Aseguramos que PrismaService esté disponible en este módulo
  ],
  providers: [JwtStrategy, UserService],
  exports: [JwtModule],
})
export class AuthModule {}
