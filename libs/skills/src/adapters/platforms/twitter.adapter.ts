import { Logger } from '@nestjs/common';
import { RegisterSkill } from '../../decorators/register-skill.decorator';
import { Skill } from '../../skills.interface';

@RegisterSkill('platform', 'twitter')
export class TwitterAdapter implements Skill {
  private readonly logger = new Logger(TwitterAdapter.name);

  constructor() {}

  execute(): void {
    this.logger.log('TwitterAdapter executed');
  }
}
