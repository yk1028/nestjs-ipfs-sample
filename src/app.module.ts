import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NftController } from './nft/nft.controller';
import { NftService } from './nft/nft.service';
import { IpfsService } from './ipfs/ipfs.service';
import { NftModule } from './nft/nft.module';
import { IpfsModule } from './ipfs/ipfs.module';

@Module({
  imports: [IpfsModule, NftModule],
  controllers: [AppController, NftController],
  providers: [AppService, IpfsService, NftService],
})
export class AppModule {}
