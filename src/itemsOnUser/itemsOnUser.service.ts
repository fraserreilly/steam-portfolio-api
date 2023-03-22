import { ForbiddenException, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateUserItemDto, EditUserItemDto } from './dto';

@Injectable()
export class ItemsOnUserService {
  constructor(private prisma: PrismaService) {}

  getUserItems(userId: string) {
    return this.prisma.itemsOnUsers.findMany({
      where: {
        userId,
      },
    });
  }

  getUserItemById(userId: string, itemId: number) {
    return this.prisma.itemsOnUsers.findFirst({
      where: {
        itemId: itemId,
        userId,
      },
    });
  }

  async createUserItem(userId: string, itemId: number, dto: CreateUserItemDto) {
    const item = await this.prisma.itemsOnUsers.create({
      data: {
        ...dto,
        user: {
          connect: {
            id: userId,
          },
        },
        item: {
          connect: {
            id: itemId,
          },
        },
      },
    });

    return item;
  }

  async editUserItemById(userId: string, itemId: number, dto: EditUserItemDto) {
    // get the item by id
    const item = await this.prisma.itemsOnUsers.findUnique({
      where: {
        itemId_userId: {
          itemId: itemId,
          userId: userId,
        },
      },
    });

    // check if user owns the item
    if (!item || item.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    return this.prisma.itemsOnUsers.update({
      where: {
        itemId_userId: {
          itemId: itemId,
          userId: userId,
        },
      },
      data: {
        ...dto,
      },
    });
  }

  async deleteUserItemById(userId: string, itemId: number) {
    const item = await this.prisma.itemsOnUsers.findUnique({
      where: {
        itemId_userId: {
          itemId: itemId,
          userId: userId,
        },
      },
    });

    // check if user owns the item
    if (!item || item.userId !== userId)
      throw new ForbiddenException('Access to resources denied');

    await this.prisma.itemsOnUsers.delete({
      where: {
        itemId_userId: {
          itemId: itemId,
          userId: userId,
        },
      },
    });
  }
}
