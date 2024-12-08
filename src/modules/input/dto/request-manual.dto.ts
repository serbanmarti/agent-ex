import { IsNotEmpty, IsString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class ManualDto {
  @ApiProperty({
    minLength: 1,
    example: 'Post a funny joke on Twitter',
    description: 'The command to be executed by the agent',
  })
  @IsString()
  @IsNotEmpty()
  readonly command: string;
}
