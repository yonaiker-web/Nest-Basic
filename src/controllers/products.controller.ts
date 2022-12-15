import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
  Put,
  Query,
  Res,
} from '@nestjs/common';
import { Response } from 'express';
import { CreateProductDto, UpdateProductDto } from 'src/dto/product.dto';
import { ProductsService } from 'src/services/products.service';

// 'products' indica que todos los endpoint empiezan con ese string
@Controller('products')
export class ProductsController {
  //creamos una instancia de los productos que retorna el servicio
  constructor(private productsService: ProductsService) {}

  //usando el params query
  //sirve para filtrar por url y no enviar una sola peticion
  @Get('')
  getProduct(
    //agregamos cada filtro y su tipo de dato y poder enviar datos por defecto si no se especifica uno
    @Query('limit') limit = 101,
    //desde donde va a iniciar
    @Query('offset') offset: number = 0,
    @Query('brand') brand: string,
  ) {
    //hacemos una deconstruccion para ver los valore sde params
    //const { limit, offset } = params;

    //retornamos lo que nos devuelve el endpoint
    return this.productsService.findAll();
    // return [
    //   {
    //     error: 0,
    //     result: {
    //       message: `productos, limit= ${limit},  offset= ${offset}, brand= ${brand}`,
    //     },
    //   },
    // ];
  }

  //como evitar al tener dos rutas parecidas choquen, poniendo la ruta simple de primero y la dinamica de segundo
  @Get('filter')
  //en el decorador @param pasamos el id del producto y definimos el tipo de dato
  getFilter(@Param('productId') productId: number) {
    //solo usamos el id del producto sin hacer destructurin
    return [
      {
        error: 0,
        result: {
          message: `soy un Producto filtrado`,
        },
      },
    ];
  }

  //obtenemos los productos por id (ruta dinamica)
  //en la ruta accedemos a productos y el id
  @Get(':productId')
  //definimos un estado http
  @HttpCode(HttpStatus.ACCEPTED)
  //en el decorador @param pasamos el id del producto y definimos el tipo de dato
  getId(
    @Param(
      'productId',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    productId: number,
  ) {
    //retonamos los que devuelve el endpoint
    return this.productsService.findOne(productId);

    //respuesta topo express
    // response.status(200).send({
    //   message: `Producto ${productId}`,
    // });

    //solo usamos el id del producto sin hacer destructurin
    // return [
    //   {
    //     error: 0,
    //     result: {
    //       message: `Producto ${productId}`,
    //     },
    //   },
    // ];
  }

  //metodo post para crear
  @Post()
  //creacion de un producto
  //el body maneja el cuerpo de la peticion (json). y el tipo de dato sera CreateProductDto
  create(@Body() payload: CreateProductDto) {
    return this.productsService.create(payload);

    // return [
    //   {
    //     error: 0,
    //     result: {
    //       message: `producto creadp`,
    //       payload,
    //     },
    //   },
    // ];
  }

  //
  @Put(':id')
  update(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
    @Body() payload: UpdateProductDto,
  ) {
    console.log('loco');

    return this.productsService.update(id, payload);
  }

  @Delete(':id')
  delete(
    @Param(
      'id',
      new ParseIntPipe({ errorHttpStatusCode: HttpStatus.NOT_ACCEPTABLE }),
    )
    id: number,
  ) {
    return this.productsService.delete(id);
  }
}
