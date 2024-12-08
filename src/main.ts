import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { AppModule } from './app.module';
import { ConfigService } from '@nestjs/config';
import { IndexModule } from './modules/index/index.module';
import { InputModule } from './modules/input/input.module';
import { loadSkills } from '@app/skills';
import { NestFactory } from '@nestjs/core';

declare const module: any;

async function bootstrap() {
  // Load skills (platform and tools) before starting the app
  loadSkills();

  const app = await NestFactory.create(AppModule);

  app.setGlobalPrefix('api/v1');

  const configService = app.get(ConfigService);

  const openApiConfig = new DocumentBuilder()
    .setTitle('AI AGENT API')
    .setDescription('The AI Agent API documentation')
    .setVersion('0.0.1')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, openApiConfig, {
    include: [IndexModule, InputModule],
  });
  document.tags = [
    { name: 'default', description: 'Default operations' },
    ...document.tags!.filter((tag) => tag.name !== 'default'),
  ];
  SwaggerModule.setup('api', app, document);

  if (module.hot) {
    module.hot.accept();
    module.hot.dispose(() => app.close());
  }

  app.enableShutdownHooks();

  await app.listen(configService.get('NEST.PORT', '3000'));
}
bootstrap();
