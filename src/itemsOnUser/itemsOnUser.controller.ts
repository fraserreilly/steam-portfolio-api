import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser } from '../auth/decorator';
import { JwtGuard, RolesGuard } from '../auth/guard';
import { ItemsOnUserService } from './itemsOnUser.service';
import { CreateUserItemDto, EditUserItemDto } from './dto';

@UseGuards(JwtGuard, RolesGuard)
@Controller('itemsOnUser')
export class ItemsOnUserController {
  constructor(private itemsOnUserService: ItemsOnUserService) {}

  @Get()
  getUserItems(@GetUser('id') userId: string) {
    return this.itemsOnUserService.getUserItems(userId);
  }

  @Get(':id')
  getUserItemById(
    @GetUser('id') userId: string,
    @Param('id', ParseIntPipe) itemId: number
  ) {
    return this.itemsOnUserService.getUserItemById(userId, itemId);
  }

  @Post(':itemId')
  createUserItem(
    @GetUser('id') userId: string,
    @Param('itemId', ParseIntPipe) itemId: number,
    @Body() dto: CreateUserItemDto
  ) {
    return this.itemsOnUserService.createUserItem(userId, itemId, dto);
  }

  @Patch(':id')
  editUserItemById(
    @GetUser('id') userId: string,
    @Param('id', ParseIntPipe) itemId: number,
    @Body() dto: EditUserItemDto
  ) {
    return this.itemsOnUserService.editUserItemById(userId, itemId, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':id')
  deleteUserItemById(
    @GetUser('id') userId: string,
    @Param('id', ParseIntPipe) itemId: number
  ) {
    return this.itemsOnUserService.deleteUserItemById(userId, itemId);
  }
}
