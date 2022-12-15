import { Body, Controller, Get, Param, Post } from '@nestjs/common';

@Controller('brands')
export class BrandsController {
  @Get('all')
  getBrands() {
    return 'todas las marcas';
  }

  @Get(':id')
  getBrandId(@Param('id') id: string) {
    return 'marca por id';
  }

  @Post()
  //el body maneja el cuerpo de la peticion (json).
  create(@Body() payload: any) {
    return [
      {
        error: 0,
        result: {
          message: `Marca creadp`,
          payload,
        },
      },
    ];
  }
}
