import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import { IsString, IsNumber, IsNotEmpty, Min } from 'class-validator';

export class CreateProductDto {
  @ApiProperty({
    description: 'Nombre del producto',
    example: 'Pizza Pepperoni',
  })
  @IsString()
  @IsNotEmpty({ message: 'El nombre del producto es obligatorio' })
  name: string;

  @ApiPropertyOptional({
    description: 'Descripción del producto',
    example: 'Pizza con ingredientes especiales',
  })
  @IsString()
  description?: string;

  @ApiProperty({
    description: 'Precio del producto',
    example: 150,
    minimum: 0,
  })
  @IsNumber()
  @IsNotEmpty({ message: 'El precio del producto es obligatorio' })
  @Min(0, { message: 'El precio no puede ser negativo' })
  price: number;

  @ApiProperty({
    description: 'Categoría del producto',
    example: 'Pizzas',
  })
  @IsString()
  @IsNotEmpty({ message: 'La categoría del producto es obligatoria' })
  category: string;
}
