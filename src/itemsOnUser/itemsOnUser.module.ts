import { Module } from '@nestjs/common';
import { ItemsOnUserController } from './itemsOnUser.controller';
import { ItemsOnUserService } from './itemsOnUser.service';

@Module({
  controllers: [ItemsOnUserController],
  providers: [ItemsOnUserService],
})
export class ItemModule {}
