import { Body, Controller, Get, Param, Post, Query, UploadedFile, UseInterceptors } from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { NftService } from './nft.service';
import { UploadNftDto } from './upload-nft.dto';

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
  async createNft(@UploadedFile() image: Express.Multer.File, @Body() uploadNftDto: UploadNftDto): Promise<string> {
    return await this.nftService.saveNft(image, uploadNftDto);
  }

  @Post('upload/mfs')
  @UseInterceptors(FileInterceptor('image'))
  async createNftByMfs(@UploadedFile() image: Express.Multer.File, @Body() uploadNftDto: UploadNftDto): Promise<Object> {
    console.log(uploadNftDto)
    return await this.nftService.saveNftByMfs(image, uploadNftDto);
  }
}
