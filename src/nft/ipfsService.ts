import { Injectable } from '@nestjs/common';
import { create } from 'ipfs-http-client';
import { Metadata } from 'src/model/metadata';

export class IpfsService {

    constructor(private ipfs = create()) { }

    async getNft(cid: string): Promise<string> {
        let content = [];
        for await (const chunk of this.ipfs.get(cid)) {
            content = [...content, ...chunk];
        }
        return Buffer.from(content).toString('base64') // json = utf8, image = base64
    }

    async addNft(metadata: Metadata, file: Express.Multer.File): Promise<string> {

        const { cid } = await this.ipfs.add(
            { path: metadata.path, content: file.buffer as any },
            { trickle: true },
        );

        return cid.toString();
    }
}