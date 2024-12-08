import { ConfigService } from '@nestjs/config';
import { Injectable } from '@nestjs/common';
import OpenAI from 'openai';
import { TEXT_ANALYSIS_SYSTEM_PROMPT } from './prompts/system.prompt';

@Injectable()
export class OpenaiService {
  private readonly client: OpenAI;

  constructor(private readonly configService: ConfigService) {
    this.client = new OpenAI({
      apiKey: this.configService.get<string>('OPENAI.KEY'),
    });
  }

  async fastApiCall(prompt: string): Promise<string | null> {
    const completion = await this.client.chat.completions.create({
      model: 'gpt-4-turbo',
      temperature: 0,
      top_p: 1,
      frequency_penalty: 0,
      presence_penalty: 0,
      messages: [
        { role: 'system', content: TEXT_ANALYSIS_SYSTEM_PROMPT },
        { role: 'user', content: prompt },
      ],
    });

    return completion.choices[0].message.content;
  }
}
