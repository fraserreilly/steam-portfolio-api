import { Body, Controller, Get, Patch, UseGuards } from '@nestjs/common';
import { User } from '@prisma/client';
import { GetUser, Roles } from '../auth/decorator';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { EditUserDto } from './dto';
import { UserService } from './user.service';

@UseGuards(JwtGuard, RolesGuard)
@Controller('users')
export class UserController {
  constructor(private userService: UserService) {}
  @Get('me')
  getMe(@GetUser() user: User) {
    return user;
  }

  @Patch()
  @Roles('ADMIN')
  editUser(@GetUser('id') userId: string, @Body() dto: EditUserDto) {
    return this.userService.editUser(userId, dto);
  }
}
