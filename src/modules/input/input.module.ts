import { InputController } from './input.controller';
import { Module } from '@nestjs/common';
import { RouterModule } from '@app/router';

@Module({
  imports: [RouterModule],
  controllers: [InputController],
})
export class InputModule {}
