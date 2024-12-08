import { Injectable, Logger } from '@nestjs/common';
import { OpenaiService } from '@app/openai';
import { RequestDto } from '@app/router/dto/request.dto';
import { SkillsRegistry } from '@app/skills';

@Injectable()
export class RouterService {
  private readonly logger = new Logger(RouterService.name);

  private readonly skillsRegistry: SkillsRegistry;
  private readonly availablePlatforms: string[];
  private readonly availableTools: string[];

  constructor(private readonly openAiClient: OpenaiService) {
    this.skillsRegistry = SkillsRegistry.instance;
    this.availablePlatforms = this.skillsRegistry.getPlatformNames();
    this.availableTools = this.skillsRegistry.getToolNames();
  }

  async handle(requestDto: RequestDto): Promise<void> {
    try {
      // Call the OpenAI API to analyze the text and return the name of the platform or tool the text is about
      const resp = await this.openAiClient.fastApiCall(`
        Task: Given the following text, analyze it and return the name of the platform or tool the text is about:
        "${requestDto.command}"

        Rules:
        - The available list of platforms and tools are: ${this.availablePlatforms.join(', ')} or ${this.availableTools.join(', ')}.
        - If the text is not about any of the platforms or tools listed, return "none".

        Format: Report with only the platform name, in lowercase, or "none" if nothing found or matched.
      `);

      if (resp === null) {
        this.logger.error('No response from the OpenAI API.');
        return;
      }

      if (resp === 'none') {
        this.logger.warn('No platform or tool found in the text.');
        return;
      }

      // Execute the platform or tool, if found
      if (this.availablePlatforms.includes(resp)) {
        const platform = this.skillsRegistry.getPlatform(resp);
        platform.execute();
      } else if (this.availableTools.includes(resp)) {
        const tool = this.skillsRegistry.getTool(resp);
        tool.execute();
      } else {
        this.logger.error(`Invalid platform or tool found in the text: ${resp}`);
      }
    } catch (error) {
      this.logger.error('Error while handling request:', error);
    }
  }
}
