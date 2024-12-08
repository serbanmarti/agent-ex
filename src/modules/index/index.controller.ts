import { Controller, Get } from '@nestjs/common';

@Controller()
export class IndexController {
  @Get()
  async fetchAll() {
    return {
      message: `Welcome to the AI Agent API!`,
    };
  }
}
