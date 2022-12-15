import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateUserDto, UpdateUserDto } from 'src/dto/user.dt';
import { User } from 'src/entities/user.entity';

@Injectable()
export class UsersService {
  private counterId = 1;
  private users: User[] = [
    {
      id: 1,
      email: 'user1@gmail.com',
      password: 'string',
      rol: 'admin',
    },
    {
      id: 2,
      email: 'user2@gmail.com',
      password: 'string',
      rol: 'user',
    },
  ];

  getAll() {
    return this.users;
  }

  getOne(id: number) {
    const user = this.users.find((item) => item.id === id);
    if (!user) {
      throw new NotFoundException(`id ${id} no encontrado`);
    }

    return user;
  }

  create(paylaod: CreateUserDto) {
    this.counterId = this.counterId + 1;

    const newUser = {
      id: this.counterId,
      ...paylaod,
    };

    this.users.push(newUser);

    return newUser;
  }

  update(id: number, paylaod: UpdateUserDto) {
    const user = this.getOne(id);

    if (!user) {
      const index = this.users.findIndex((item) => item.id === id);

      this.users[index] = { ...user, ...paylaod };

      return this.users[index];
    }

    return null;
  }

  delete(id: number) {
    const index = this.users.findIndex((item) => item.id === id);
    if (index === -1) {
      throw new NotFoundException(`ususario #${id} no encontrado`);
    }

    this.users.splice(index, 1);
    return true;
  }
}
