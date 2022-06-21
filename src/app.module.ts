import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IpfsService } from './nft/ipfsService';
import { NftController } from './nft/nft.controller';
import { NftService } from './nft/nft.service';

@Module({
  controllers: [AppController, NftController],
  providers: [AppService, NftService, IpfsService],
})
export class AppModule {}
