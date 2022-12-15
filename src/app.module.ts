import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsController } from './controllers/products.controller';
import { CategoriesController } from './controllers/categories.controller';
import { UsersController } from './controllers/users.controller';
import { CustomersController } from './controllers/customers.controller';
import { BrandsController } from './controllers/brands.controller';
import { ProductsService } from './services/products.service';
import { CategoriesService } from './services/categories.service';
import { UsersService } from './services/users.service';
import { CustomersService } from './services/customers.service';
import { BrandsService } from './services/brands.service';

@Module({
  imports: [],
  controllers: [
    AppController,
    ProductsController,
    CategoriesController,
    UsersController,
    CustomersController,
    BrandsController,
  ],
  providers: [AppService, ProductsService, CategoriesService, UsersService, CustomersService, BrandsService],
})
export class AppModule {}
