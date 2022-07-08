import { Injectable } from '@nestjs/common';
import { create } from 'ipfs-http-client';
import { Metadata } from 'src/model/metadata';
const ipfsCluster = require('ipfs-cluster-api');

@Injectable()
export class IpfsService {

    private ipfs = create({ url: "http://34.83.82.136:5001" });
    private cluster = ipfsCluster({ host: "34.83.82.136", port: "9094", protocol: 'http' });

    private id = 0;

    async getNftMetadataByCid(cid: string): Promise<string> {
        let content = [];
        for await (const chunk of this.ipfs.cat(cid)) { // get, cat
            content = [...content, ...chunk];
        }

        return this.contentToJson(content);
    }

    async findCidByMfsPath(path: string) {
        const stats = await this.ipfs.files.stat(path);
        return stats.cid.toString();
    }

    private contentToJson(content: any[]): string {
        const raw = Buffer.from(content).toString('utf8') // json = utf8, image = base64 Buffer.from(content).toString('base64')
        console.log(raw)
        return JSON.parse(raw);
    }

    async addNft(metadata: Metadata, file: Express.Multer.File): Promise<string> {

        const { cid: imageCid } = await this.ipfs.add(
            { path: `${metadata.path}/nft${this.id}/image`, content: file.buffer as any },
            { trickle: true },
        );

        const jsonMetadata = {
            name: metadata.headers.filename,
            image_cid: imageCid.toString()
        }

        const { cid } = await this.ipfs.add(
            { path: `${metadata.path}/nft${this.id}/metadata`, content: JSON.stringify(jsonMetadata) as any },
            { trickle: true },
        );

        this.id++;

        return cid.toString();
    }

    async addNftByMfs(metadata: Metadata, image: Express.Multer.File): Promise<Object> {
        const imagePath = await this.addImageToIPFSByMfs(metadata, image);
        const imageCid = await this.findCidByMfsPath(imagePath);
        const metadataPath = await this.addMetadataToIPFSByMfs(metadata, imageCid);

        const nftPath = `${metadata.path}/nft${this.id}`;
        const nftCid: string = await this.findCidByMfsPath(nftPath);

        await this.pinToCluster(nftCid);

        this.id++;

        return { nftPath, nftCid };
    }

    private async addImageToIPFSByMfs(metadata: Metadata, file: Express.Multer.File): Promise<string> {
        const imagePath = `${metadata.path}/nft${this.id}/image`;

        await this.ipfs.files.write(imagePath, file.buffer, { create: true, parents: true });
        return imagePath;
    }

    private async addMetadataToIPFSByMfs(metadata: Metadata, imageCid: string): Promise<string> {
        const jsonMetadata = {
            name: metadata.headers.filename,
            image_cid: imageCid
        }
        const metadataPath = `${metadata.path}/nft${this.id}/metadata`;

        await this.ipfs.files.write(metadataPath, JSON.stringify(jsonMetadata), { create: true, parents: true });

        return metadataPath;
    }

    private async pinToCluster(cid: string): Promise<void> {
        await this.cluster.pin.add(cid, (err) => {
            err ? console.error(err) : console.log('pin added')
        });
    }
}
