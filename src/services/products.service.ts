import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateProductDto, UpdateProductDto } from 'src/dto/product.dto';
import { Product } from 'src/entities/product.entity';

@Injectable()
export class ProductsService {
  private counterId = 1;
  private products: Product[] = [
    {
      id: 1,
      name: 'PRoducto 1',
      description: 'descripcion corta',
      price: 45,
      stock: 15,
      image: '',
    },
    {
      id: 2,
      name: 'PRoducto 2',
      description: 'descripcion corta 2',
      price: 14,
      stock: 8,
      image: '',
    },
  ];

  //endpoint para traer todos los productos
  findAll() {
    return this.products;
  }

  //endpoint para trar un producto por id
  //en el enpoint pasamos el id
  findOne(id: number) {
    //retornamos los productos usando find para obtener el primer elemento que cumpla con ese id
    const product = this.products.find((item) => item.id === id);
    if (!product) {
      throw new NotFoundException(`id ${id} no encontrado`);
    }
    return product;
  }

  //endpoint para crear producto
  //le pasamos un payload con el tipo de datos CreateProductDto
  create(payload: CreateProductDto) {
    //incrementamos el contador
    this.counterId = this.counterId + 1;

    //creamos un objeto agregandole el id manual mas todo lo que venga en el payload
    const newProduct = {
      id: this.counterId,
      ...payload,
    };
    //agregamos el nuevo producto al array
    this.products.push(newProduct);

    return newProduct;
  }

  //endpoint para actualizar
  //le pasamos el id a actualizar
  update(id: number, payload: UpdateProductDto) {
    //buscamos el id del producto a actualizar
    const product = this.findOne(id);

    //si el producto existe
    if (product) {
      //ubicamos la posicion en el array de este producto
      const index = this.products.findIndex((item) => item.id === id);

      //agregamos en la posicion tal el paylaod, haciendo un merge de los datos viejso con los datos nuevos
      this.products[index] = { ...product, ...payload };

      return this.products[index];
    }

    return null;
  }

  delete(id: number) {
    const index = this.products.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`Producto #${id} no fue encontrado`);
    }

    this.products.splice(index, 1);
    return true;
  }
}
