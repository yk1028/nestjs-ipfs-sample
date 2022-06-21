import { Body, Controller, Get, Param, Post, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
// import { multerDiskOptions } from 'src/common/multer.options';
import { NftService } from './nft.service';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) { }

  @Get(':cid')
  async readNft(@Param('cid') cid: string) {
    console.log(cid)
    // get nft metadata from ipfs with cid..?
    return await this.nftService.findNft(cid);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async createNft(@UploadedFile() file: Express.Multer.File, @Body('bucket') bucket: string): Promise<string> { // body metadata class 생성
    
    console.log(file)
    console.log(bucket)

    return await this.nftService.saveNft(file, bucket);
  }
}

// add nft metadata to ipfs
// image 파일 저장 경로 확인 => const description = file.destination;
// ipfs에 image file(file.buffer) 저장 -> cid 획득
// image file cid와 body 내용으로 metadata 구성하여 ipfs에 저장 -> cid
// metadata cid return
