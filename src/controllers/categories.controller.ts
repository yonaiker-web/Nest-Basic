import { Controller, Get, Param } from '@nestjs/common';

@Controller('categories')
export class CategoriesController {
  //usando dos parametos el id de la categoria y el id del producto
  //en la ruta accedemos a categoria y el id
  @Get(':categoryId/products/:productId')
  //en el decorador @param pasamos todos los id y espesificamos el tipo de dato
  getCategoryt(
    @Param('productId') productId: string,
    @Param('categoryId') categoryId: string,
  ) {
    //solo usamos los ids sin hacer destructurin
    return [
      {
        error: 0,
        result: {
          message: `Producto ${productId} y categoria ${categoryId}`,
        },
      },
    ];
  }
}
