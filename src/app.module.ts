import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { NftModule } from './nft/nft.module';
import { IpfsModule } from './ipfs/ipfs.module';

@Module({
  imports: [IpfsModule, NftModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
