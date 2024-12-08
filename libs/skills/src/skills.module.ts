import { Module } from '@nestjs/common';
import { SkillsRegistry } from '@app/skills/skills.registry';

@Module({
  providers: [SkillsRegistry],
  exports: [SkillsRegistry],
})
export class SkillsModule {}
