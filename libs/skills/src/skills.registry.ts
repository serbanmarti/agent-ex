import { Logger } from '@nestjs/common';
import { Skill } from '@app/skills/skills.interface';
import { SkillType } from '@app/skills/types/skills';

/*
 * This class is a singleton that registers all the skills in the application.
 */
export class SkillsRegistry {
  private readonly logger = new Logger(SkillsRegistry.name);

  private static _instance: SkillsRegistry;
  private platforms: Map<string, Skill> = new Map();
  private tools: Map<string, Skill> = new Map();

  public constructor() {}

  public static get instance(): SkillsRegistry {
    if (!SkillsRegistry._instance) {
      SkillsRegistry._instance = new SkillsRegistry();
    }
    return SkillsRegistry._instance;
  }

  public register(type: SkillType, name: string, skill: Skill) {
    this.logger.log(`Registering skill: ${type} - ${name}`);

    switch (type) {
      case 'platform':
        this.platforms.set(name, skill);
        break;
      case 'tool':
        this.tools.set(name, skill);
        break;
    }
  }

  public getPlatformNames(): string[] {
    return Array.from(this.platforms.keys());
  }

  public getPlatform(name: string): Skill {
    const skill = this.platforms.get(name);
    if (!skill) {
      throw new Error(`Platform ${name} not found`);
    }
    return skill;
  }

  public getToolNames(): string[] {
    return Array.from(this.tools.keys());
  }

  public getTool(name: string): Skill {
    const skill = this.tools.get(name);
    if (!skill) {
      throw new Error(`Tool ${name} not found`);
    }
    return skill;
  }
}
