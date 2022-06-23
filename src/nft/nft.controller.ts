import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NftService } from './nft.service';
import { PathDto } from './pathDto';

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
  async createNft(@UploadedFile() file: Express.Multer.File, @Body('game-name') gameName: string): Promise<string> {
    console.log(file)
    console.log(gameName)

    return await this.nftService.saveNft(file, gameName);
  }

  @Post('upload/mfs')
  @UseInterceptors(FileInterceptor('image'))
  async createNftMFS(@UploadedFile() file: Express.Multer.File, @Body('game-name') gameName: string): Promise<string> {
    console.log(file)
    console.log(gameName)

    return await this.nftService.saveNftMfs(file, gameName);
  }
}
