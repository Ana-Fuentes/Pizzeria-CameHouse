import { ApiProperty } from '@nestjs/swagger';

export class ProductEntity {
  @ApiProperty({
    description: 'Identificador único del producto',
    example: 1,
  })
  id: number;

  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Pizza Pepperoni',
  })
  name: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 150.00,
  })
  price: number;

  @ApiProperty({
    description: 'Fecha de creación del producto',
    example: '2026-09-10T20:30:00.000Z',
  })
  createdAt: Date;
}
