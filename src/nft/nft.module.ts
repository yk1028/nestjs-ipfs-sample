import { Module } from '@nestjs/common';
import { IpfsModule } from '../ipfs/ipfs.module';
import { IpfsService } from '../ipfs/ipfs.service';
import { NftController } from './nft.controller';
import { NftService } from './nft.service';

@Module({
    imports: [IpfsModule],
    controllers: [NftController],
    providers: [IpfsService, NftService]
})
export class NftModule {}
