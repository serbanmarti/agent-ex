import { Logger } from '@nestjs/common';
import { RegisterSkill } from '../../decorators/register-skill.decorator';
import { Skill } from '../../skills.interface';

@RegisterSkill('tool', 'crypto')
export class CryptoAdapter implements Skill {
  private readonly logger = new Logger(CryptoAdapter.name);

  constructor() {}

  execute(): void {
    this.logger.log('CryptoAdapter executed');
  }
}
