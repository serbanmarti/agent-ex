import { ApiProperty } from '@nestjs/swagger';

export class ErrorDto {
  @ApiProperty()
  readonly message: string;

  @ApiProperty()
  readonly statusCode: number;
}
