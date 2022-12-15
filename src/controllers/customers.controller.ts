import { Controller, Get, Param } from '@nestjs/common';

@Controller('customers')
export class CustomersController {
  @Get('all')
  getCustomers() {
    return 'todos los clientes';
  }

  @Get(':id')
  getCustomerId(@Param('id') id: string) {
    return 'cliente por id';
  }
}
