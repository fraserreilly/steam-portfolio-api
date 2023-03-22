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
import { JwtGuard, RolesGuard } from '../auth/guard';
import { Roles } from '../auth/decorator';
import { ItemService } from './Item.service';
import { CreateItemDto, EditItemDto } from './dto';

@UseGuards(JwtGuard, RolesGuard)
@Controller('items')
export class ItemController {
  constructor(private ItemService: ItemService) {}

  @Get()
  @Roles('USER')
  getItems() {
    return this.ItemService.getItems();
  }

  @Get(':itemId')
  @Roles('USER')
  getItemsByAppID(@Param('itemId', ParseIntPipe) appID: number) {
    return this.ItemService.getItemsByAppID(appID);
  }

  @Get(':name')
  @Roles('USER')
  getItemByName(@Param('name') name: string) {
    return this.ItemService.getItemByName(name);
  }

  @Post()
  @Roles('ADMIN')
  createItem(@Body() dto: CreateItemDto) {
    return this.ItemService.createItem(dto);
  }

  @Patch(':name')
  @Roles('ADMIN')
  editItemByName(@Param('name') name: string, @Body() dto: EditItemDto) {
    return this.ItemService.editItemByName(name, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete(':name')
  @Roles('ADMIN')
  deleteItemByName(@Param('name') name: string) {
    return this.ItemService.deleteItemByName(name);
  }
}
