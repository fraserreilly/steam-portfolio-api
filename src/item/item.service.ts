import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateItemDto, EditItemDto } from './dto';

@Injectable()
export class ItemService {
  constructor(private prisma: PrismaService) {}

  getItems() {
    return this.prisma.item.findMany();
  }

  getItemsByAppID(appID: number) {
    return this.prisma.item.findMany({
      where: {
        appID: appID,
      },
    });
  }

  getItemByName(name: string) {
    return this.prisma.item.findFirst({
      where: {
        name: name,
      },
    });
  }

  async createItem(dto: CreateItemDto) {
    const item = await this.prisma.item.create({
      data: {
        ...dto,
      },
    });

    return item;
  }

  async editItemByName(name: string, dto: EditItemDto) {
    return this.prisma.item.update({
      where: {
        name: name,
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteItemByName(name: string) {
    await this.prisma.item.delete({
      where: {
        name: name,
      },
    });
  }
}
