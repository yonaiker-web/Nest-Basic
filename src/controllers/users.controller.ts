import { Controller, Get, Param, Query } from '@nestjs/common';
import { get } from 'http';
import { UsersService } from 'src/services/users.service';

@Controller('users')
export class UsersController {
  constructor(private usersService: UsersService) {}

  @Get('')
  getUsers(
    @Query('limit') limit = 100,
    @Query('offset') offset = 0,
    @Query('rol') rol: string,
  ) {
    return this.usersService.getAll();
  }

  @Get(':id')
  getUserId(@Param('id') id: string) {
    return 'user por id';
  }
}
