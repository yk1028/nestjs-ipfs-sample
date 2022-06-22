import { Injectable } from '@nestjs/common';
import { create } from 'ipfs-http-client';
import { Metadata } from 'src/model/metadata';

@Injectable()
export class IpfsService {

    private ipfs = create()

    async getNft(cid: string): Promise<string> {
        let content = [];
        for await (const chunk of this.ipfs.cat(cid)) { // get, cat
            content = [...content, ...chunk];
        }

        const raw = Buffer.from(content).toString('utf8') // json = utf8, image = base64 Buffer.from(content).toString('base64')
        console.log(raw)
        return JSON.parse(raw);
    }

    async addNft(metadata: Metadata, file: Express.Multer.File): Promise<string> {

        const { cid: imageCid } = await this.ipfs.add(
            { path: metadata.path, content: file.buffer as any },
            { trickle: true },
        );

        const data = `{
            "name": "${metadata.headers.filename}",
            "image_url": "${imageCid}"
        }`

        const { cid } = await this.ipfs.add(
            { path: "content", content: data as any },
            { trickle: true },
        );

        return cid.toString();
    }
}
