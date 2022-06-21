import { Injectable } from '@nestjs/common';
import { Metadata } from 'src/model/metadata';
import { IpfsService } from './ipfsService';

@Injectable()
export class NftService {
    constructor(private readonly ipfsService: IpfsService) { }

    async findNft(cid: string): Promise<string> {

        return this.ipfsService.getNft(cid);
    }

    async saveNft(file: Express.Multer.File, bucket: string): Promise<string> {

        const metadata: Metadata = {
            headers: {
                filename: file.originalname,
                contentType: file.mimetype,
                size: file.size,
            },
            path: `/${bucket}/${file.originalname}`,
        };

        const res = await this.ipfsService.addNft(metadata, file)
        console.log(res)

        return res;
    }
}
