import * as core from '@actions/core';
import archiver from 'archiver';
import { PassThrough, Stream } from 'stream';

function streamToBuffer(stream: Stream): Promise<Buffer> {
    const chunks: Uint8Array[] = [];

    return new Promise((resolve, reject) => {
        stream.on('data', (chunk) => chunks.push(Buffer.from(chunk)));
        stream.on('error', (err) => reject(err));
        stream.on('end', () => resolve(Buffer.concat(chunks)));
    });
}

export async function zipDirectory(sourcePath: string, pattern: string[], ignore: string[]): Promise<Buffer> {
    core.startGroup('ZipDirectory');

    try {
        const bufferStream = new PassThrough();

        const archive = archiver('zip', { zlib: { level: 9 } });
        core.info('Archive initialize');

        archive.pipe(bufferStream);

        await archive
            .glob(pattern, {
                cwd: sourcePath,
                dot: true,
                ignore: ignore,
            })
            .finalize();

        core.info('Archive finalized');

        bufferStream.end();
        const buffer = await streamToBuffer(bufferStream);

        if (!buffer) throw Error('Failed to initialize Buffer');

        core.info('Buffer object created');

        return buffer;
    } finally {
        core.endGroup();
    }
}

// pattern1|pattern2|...|patternN
export function parsePattern(pattern: string) {
    return pattern.split("|").filter(x => x.length > 0);
}

// key1=value1,key2=value2,...,keyN=valueN
export function parseEnvironmentVariables(environment: string) {
    const result = {};
    environment.split(",").forEach((keyValue) => {
        const [key, value] = keyValue.split("=");
        result[key] = value;
    });

    return result;
}
