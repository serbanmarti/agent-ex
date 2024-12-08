import { Logger } from '@nestjs/common';
import { RegisterSkill } from '../../decorators/register-skill.decorator';
import { Skill } from '../../skills.interface';

@RegisterSkill('tool', 'chatgpt')
export class ChatGptAdapter implements Skill {
  private readonly logger = new Logger(ChatGptAdapter.name);

  constructor() {}

  execute(): void {
    this.logger.log('ChatGptAdapter executed');
  }
}
