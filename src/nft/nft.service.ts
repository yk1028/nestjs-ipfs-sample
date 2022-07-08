import { Injectable } from '@nestjs/common';
import { IpfsService } from '../ipfs/ipfs.service';
import { Metadata } from 'src/model/metadata';
import { UploadNftDto } from './upload-nft.dto';

@Injectable()
export class NftService {
    constructor(private readonly ipfsService: IpfsService) { }

    async findNft(cid: string): Promise<string> {
        return this.ipfsService.getNftMetadataByCid(cid);
    }

    async findCidFromMfsPath(path: string) {
        return this.ipfsService.findCidByMfsPath(path);
    }

    async saveNft(file: Express.Multer.File, uploadNftDto: UploadNftDto): Promise<string> {
        const metadata: Metadata = this.generateMetadata(file, uploadNftDto.gameName);
        const res = await this.ipfsService.addNft(metadata, file);

        return res;
    }

    async saveNftByMfs(image: Express.Multer.File, uploadNftDto: UploadNftDto): Promise<Object> {
        const metadata = this.generateMetadata(image, uploadNftDto.gameName);

        return await this.ipfsService.addNftByMfs(metadata, image);
    }

    private generateMetadata(file: Express.Multer.File, gameName: string): Metadata {
        return {
            headers: {
                filename: file.originalname,
                contentType: file.mimetype,
                size: file.size,
            },
            path: `/${gameName}`,
        };
    }
}
