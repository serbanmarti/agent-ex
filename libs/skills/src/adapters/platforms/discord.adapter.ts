import { Logger } from '@nestjs/common';
import { RegisterSkill } from '../../decorators/register-skill.decorator';
import { Skill } from '../../skills.interface';

@RegisterSkill('platform', 'discord')
export class DiscordAdapter implements Skill {
  private readonly logger = new Logger(DiscordAdapter.name);

  constructor() {}

  execute(): void {
    this.logger.log('DiscordAdapter executed');
  }
}
