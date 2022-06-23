import { Injectable } from '@nestjs/common';
import { IpfsService } from '../ipfs/ipfs.service';
import { Metadata } from 'src/model/metadata';

@Injectable()
export class NftService {
    constructor(private readonly ipfsService: IpfsService) { }

    async findNft(cid: string): Promise<string> {

        return this.ipfsService.getNft(cid);
    }

    async findCidFromMfsPath(path: string) {
        return this.ipfsService.findCidByMfsPath(path);
    }

    async saveNft(file: Express.Multer.File, gameName: string): Promise<string> {
        const metadata: Metadata = this.generateMetadata(file, gameName);
        const res = await this.ipfsService.addNft(metadata, file)
        
        console.log(res)

        return res;
    }

    async saveNftMfs(file: Express.Multer.File, gameName: string): Promise<string> {
        const metadata = this.generateMetadata(file, gameName);
        const res = await this.ipfsService.addNftMfs(metadata, file)
        
        console.log(res)

        return res;
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
