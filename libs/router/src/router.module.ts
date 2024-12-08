import { Module } from '@nestjs/common';
import { OpenaiModule } from '@app/openai';
import { RouterService } from './router.service';
import { SkillsModule } from '@app/skills';

@Module({
  imports: [OpenaiModule, SkillsModule],
  providers: [RouterService],
  exports: [RouterService],
})
export class RouterModule {}
