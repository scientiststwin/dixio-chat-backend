import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UserModule } from './user/user.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule, ConfigService } from '@nestjs/config';
import validationSchema from './config/configs.schema';
import postgresConfig from './config/postgres.config';
@Module({
  imports: [
    UserModule,
    ConfigModule.forRoot({
      envFilePath: '.env',
      isGlobal: true,
      validationSchema: validationSchema,
      load: [postgresConfig],
    }),

    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get('postgres.HOST'),
        port: +configService.get<number>('postgres.PORT'),
        username: configService.get('postgres.USER'),
        password: configService.get('postgres.PASSWORD'),
        database: configService.get('postgres.DATABASE'),
        entities: [__dirname + '/**/*.entity{.ts,.js}'],
        synchronize: true,
      }),
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
