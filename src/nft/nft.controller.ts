import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NftService } from './nft.service';

@Controller('nft')
export class NftController {
  constructor(private readonly nftService: NftService) { }

  @Get(':cid')
  async readNft(@Param('cid') cid: string) {
    console.log(cid)
    return await this.nftService.findNft(cid);
  }

  @Get()
  async findCidByMfsPath(@Query('path') path: string) {
    console.log(path)
    return await this.nftService.findCidFromMfsPath(path);
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('image'))
  async createNft(@UploadedFile() image: Express.Multer.File, @Body('game-name') gameName: string): Promise<string> {
    return await this.nftService.saveNft(image, gameName);
  }

  @Post('upload/mfs')
  @UseInterceptors(FileInterceptor('image'))
  async createNftByMfs(@UploadedFile() image: Express.Multer.File, @Body('game-name') gameName: string): Promise<string> {
    return await this.nftService.saveNftByMfs(image, gameName);
  }
}
