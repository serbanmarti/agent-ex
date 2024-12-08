import { ConfigModule } from '@nestjs/config';
import configuration from './config/configuration';
import { IndexModule } from './modules/index/index.module';
import { InputModule } from './modules/input/input.module';
import { Module } from '@nestjs/common';
import { RouterModule } from '@nestjs/core';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [configuration],
    }),
    IndexModule,
    InputModule,
    RouterModule.register([
      {
        path: '/',
        module: IndexModule,
      },
      {
        path: '/input',
        module: InputModule,
      },
    ]),
  ],
})
export class AppModule {}
