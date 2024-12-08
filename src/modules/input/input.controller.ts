import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { Body, Controller, HttpCode, Post } from '@nestjs/common';
import { ErrorDto } from '../../common/error/error.dto';
import { ManualDto } from './dto/request-manual.dto';
import { RouterService } from '@app/router';

@Controller()
@ApiTags('Input')
// @ApiBearerAuth() // TODO: Placeholder for future authentication, which should be implemented
// @UseGuards(AuthGuard('jwt'))
export class InputController {
  constructor(private readonly routerService: RouterService) {}

  @Post('/manual')
  @HttpCode(200)
  @ApiResponse({ status: 200, description: 'Request success' })
  @ApiResponse({ status: 401, type: ErrorDto })
  async manual(@Body() manualDto: ManualDto): Promise<void> {
    await this.routerService.handle({ command: manualDto.command });
  }

  // @Post('/webhook')
  // @HttpCode(200)
  // @ApiResponse({ status: 200, description: 'Request success' })
  // @ApiResponse({ status: 401, type: ErrorDto })
  // async webhook(@Body() webhookDto: WebhookDto): Promise<void> {
  //   // TODO
  // }

  // @Post('/cron')
  // @HttpCode(200)
  // @ApiResponse({ status: 200, description: 'Request success' })
  // @ApiResponse({ status: 401, type: ErrorDto })
  // async cron(@Body() cronDto: CronDto): Promise<void> {
  //   // TODO
  // }
}
