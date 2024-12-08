import { SkillsRegistry } from '@app/skills/skills.registry';
import { SkillType } from '@app/skills/types/skills';

export function RegisterSkill(type: SkillType, name: string) {
  return function (constructor: any) {
    // Create an instance of the class to be registered
    const instance = new constructor();

    // Register the instance with the SkillsRegistry
    SkillsRegistry.instance.register(type, name, instance);
  };
}
