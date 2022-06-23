import { FileHeaders } from './file';

export interface Metadata {
    headers?: FileHeaders;
    path: string;
}

export const metadataPath = (path: string): string => `.meta-${path}`;

export type MetadataFilter = (
    meta: Metadata,
    ...args: string[]
) => Promise<Metadata>;