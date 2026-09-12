import { ProductEntity } from './entities/product.entity';
import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Body,
  Param,
  ParseIntPipe,
  UseGuards,
} from '@nestjs/common';

import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';

import { Roles } from '../common/decorators/roles.decorator';
import { RolesGuard } from '../common/guards/roles.guard';

import {
  ApiTags,
  ApiOperation,
  ApiResponse,
  ApiParam,
  ApiBody,
} from '@nestjs/swagger';

@ApiTags('Products')
@Controller('products')
@UseGuards(RolesGuard)
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  // ============================================================
  // CREAR PRODUCTO
  // ============================================================

  @Post()
  @Roles('GERENTE')
  @ApiOperation({
    summary: 'Crear un nuevo producto',
    description: 'Permite al usuario con rol GERENTE registrar un nuevo producto.',
  })
  @ApiBody({
    type: CreateProductDto,
  })
  @ApiResponse({
    status: 201,
    description: 'Producto creado correctamente.',
  })
  @ApiResponse({
    status: 400,
    description: 'Datos de entrada inválidos.',
  })
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  // ============================================================
  // OBTENER TODOS LOS PRODUCTOS
  // ============================================================

  @Get()
@ApiOperation({
  summary: 'Obtener todos los productos',
  description: 'Obtiene el catálogo completo de productos registrados.',
})
@ApiResponse({
  status: 200,
  description: 'Lista de productos obtenida correctamente.',
  type: ProductEntity,
  isArray: true,
})
findAll() {
  return this.productsService.findAll();
}

  // ============================================================
  // OBTENER PRODUCTO POR ID
  // ============================================================

 @Get(':id')
@ApiOperation({
  summary: 'Obtener un producto por ID',
  description: 'Busca y devuelve la información de un producto específico.',
})
@ApiParam({
  name: 'id',
  description: 'Identificador único del producto',
  example: 1,
})
@ApiResponse({
  status: 200,
  description: 'Producto obtenido correctamente.',
  type: ProductEntity,
})
@ApiResponse({
  status: 404,
  description: 'Producto no encontrado.',
})
findOne(@Param('id', ParseIntPipe) id: number) {
  return this.productsService.findOne(id);
}

  // ============================================================
  // ACTUALIZAR PRODUCTO
  // ============================================================

  @Put(':id')
  @Roles('GERENTE')
  @ApiOperation({
    summary: 'Actualizar un producto',
    description: 'Permite al usuario con rol GERENTE modificar un producto existente.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador del producto',
    example: 1,
  })
  @ApiBody({
    type: UpdateProductDto,
  })
  @ApiResponse({
    status: 200,
    description: 'Producto actualizado correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado.',
  })
  update(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProductDto: UpdateProductDto,
  ) {
    return this.productsService.update(id, updateProductDto);
  }

  // ============================================================
  // ELIMINAR PRODUCTO
  // ============================================================

  @Delete(':id')
  @Roles('GERENTE')
  @ApiOperation({
    summary: 'Eliminar un producto',
    description: 'Permite al usuario con rol GERENTE eliminar un producto existente.',
  })
  @ApiParam({
    name: 'id',
    description: 'Identificador del producto',
    example: 1,
  })
  @ApiResponse({
    status: 200,
    description: 'Producto eliminado correctamente.',
  })
  @ApiResponse({
    status: 404,
    description: 'Producto no encontrado.',
  })
  remove(@Param('id', ParseIntPipe) id: number) {
    return this.productsService.remove(id);
  }
}
